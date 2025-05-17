import React, { useState } from 'react';
import { Camera, Upload, MapPin, X, Image as ImageIcon } from 'lucide-react';
import { Media } from '../../types';

interface MediaUploadProps {
  media: Media[];
  onChange: (media: Media[]) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ media, onChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<Media['category']>('Overall');
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const categories: Media['category'][] = [
    'Overall',
    'Sleeping Area',
    'Food Area',
    'Medical Area'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (previewUrl) {
      const newMedia: Media = {
        id: Date.now().toString(),
        type: 'image',
        url: previewUrl,
        category: selectedCategory,
        caption: caption,
        location: {
          latitude: 0,
          longitude: 0
        }
      };
      onChange([...media, newMedia]);
      setPreviewUrl(null);
      setCaption('');
    }
  };

  const handleRemove = (id: string) => {
    onChange(media.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Media Documentation</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Camera size={16} className="mr-1" />
          <span>Upload photos and videos of the facility</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Media['category'])}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload size={24} className="mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-dswd-blue hover:text-dswd-blue-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-dswd-blue">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileSelect}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Describe what's shown in the image..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={!previewUrl}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-dswd-blue hover:bg-dswd-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dswd-blue disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Upload size={16} className="mr-2" />
              Upload Image
            </button>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Uploaded Media</h4>
          
          <div className="space-y-4">
            {media.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon size={32} className="mx-auto mb-2 text-gray-400" />
                <p>No media uploaded yet</p>
              </div>
            ) : (
              media.map((item) => (
                <div key={item.id} className="relative border rounded-lg overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-black/40 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1 hover:bg-white/20 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {item.caption && (
                      <p className="text-sm mt-1 line-clamp-1">{item.caption}</p>
                    )}
                    {item.location && (
                      <div className="flex items-center text-xs mt-1">
                        <MapPin size={12} className="mr-1" />
                        <span>
                          {item.location.latitude.toFixed(6)}, {item.location.longitude.toFixed(6)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;