import React, { useState } from 'react';
import { UserPlus, Phone, Mail, Star, Trash2 } from 'lucide-react';
import { ContactPerson } from '../../types';

interface ContactPersonsProps {
  contacts: ContactPerson[];
  onChange: (contacts: ContactPerson[]) => void;
}

const ContactPersons: React.FC<ContactPersonsProps> = ({ contacts, onChange }) => {
  const [newContact, setNewContact] = useState<Partial<ContactPerson>>({
    name: '',
    position: '',
    phone: '',
    email: '',
    isPrimary: false
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      // If this is marked as primary, remove primary from others
      let updatedContacts = [...contacts];
      if (newContact.isPrimary) {
        updatedContacts = updatedContacts.map(contact => ({
          ...contact,
          isPrimary: false
        }));
      }

      onChange([...updatedContacts, {
        id: Date.now().toString(),
        name: newContact.name,
        position: newContact.position || '',
        phone: newContact.phone,
        email: newContact.email,
        isPrimary: newContact.isPrimary || false
      }]);

      setNewContact({
        name: '',
        position: '',
        phone: '',
        email: '',
        isPrimary: false
      });
    }
  };

  const handleRemoveContact = (id: string) => {
    onChange(contacts.filter(contact => contact.id !== id));
  };

  const handleTogglePrimary = (id: string) => {
    onChange(contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === id
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Contact Persons</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Phone size={16} className="mr-1" />
          <span>Add emergency contacts for the facility</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Add New Contact Form */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Full Name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                value={newContact.position}
                onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                placeholder="e.g., Facility Manager"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                placeholder="+63 XXX XXX XXXX"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                placeholder="email@example.com"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newContact.isPrimary}
                onChange={(e) => setNewContact({ ...newContact, isPrimary: e.target.checked })}
                className="rounded border-gray-300 text-dswd-blue focus:ring-dswd-blue"
              />
              <span className="ml-2 text-sm text-gray-600">Set as primary contact</span>
            </label>
            <button
              onClick={handleAddContact}
              disabled={!newContact.name || !newContact.phone}
              className="flex items-center px-4 py-2 bg-dswd-blue text-white text-sm font-medium rounded-md hover:bg-dswd-blue-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <UserPlus size={16} className="mr-2" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-900">{contact.name}</h4>
                    {contact.isPrimary && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium text-dswd-blue bg-dswd-blue/10 rounded-full">
                        Primary Contact
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{contact.position}</p>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={14} className="mr-1" />
                      <span>{contact.phone}</span>
                    </div>
                    {contact.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-1" />
                        <span>{contact.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTogglePrimary(contact.id)}
                    className={`p-2 rounded-md ${
                      contact.isPrimary
                        ? 'text-dswd-blue bg-dswd-blue/10'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <Star size={16} />
                  </button>
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="p-2 text-dswd-red hover:bg-dswd-red/10 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <UserPlus size={32} className="mx-auto mb-2 text-gray-400" />
              <p>No contacts added yet</p>
              <p className="text-sm">Add contact persons for emergency coordination</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPersons;