import { useState, useEffect } from 'react';
import type { Contact } from '../types';
import { contactsAPI } from '../api';
import { useAuth } from '../AuthContext';
import ContactForm from './ContactForm';

export default function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { user, logout } = useAuth();

  const fetchContacts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await contactsAPI.getAll();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    let result = contacts;

    if (showFavoritesOnly) {
      result = result.filter(contact => contact.favorite);
    }

    if (searchTerm) {
      result = result.filter(contact => {
        const fullName = `${contact.name.first} ${contact.name.last || ''}`.toLowerCase();
        const phone = contact.phone.toLowerCase();
        const email = (contact.email || '').toLowerCase();
        const search = searchTerm.toLowerCase();
        
        return fullName.includes(search) || phone.includes(search) || email.includes(search);
      });
    }

    setFilteredContacts(result);
  }, [searchTerm, contacts, showFavoritesOnly]);

  const handleAddContact = () => {
    setEditingContact(undefined);
    setShowForm(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      await contactsAPI.delete(id);
      await fetchContacts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete contact');
    }
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingContact(undefined);
    await fetchContacts();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingContact(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Contact Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.email || user?.phone}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:flex-1">
            <input
              type="text"
              placeholder="Search contacts by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Favorites only</span>
            </label>
            <button
              onClick={handleAddContact}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition whitespace-nowrap"
            >
              + Add Contact
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading contacts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                {contacts.length === 0 ? (
                  <div>
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="mt-2 text-gray-600 font-medium">No contacts yet</p>
                    <p className="text-gray-500 text-sm">Click "Add Contact" to create your first contact</p>
                  </div>
                ) : (
                  <div>
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="mt-2 text-gray-600 font-medium">No contacts match your search</p>
                    <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {contact.name.first} {contact.name.last}
                      </h3>
                      {contact.favorite && (
                        <span className="text-yellow-500 text-xl">⭐</span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-gray-700">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {contact.phone}
                      </p>
                      {contact.email && (
                        <p className="flex items-center gap-2 text-gray-700">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {contact.email}
                        </p>
                      )}
                      {contact.address && (contact.address.city || contact.address.state) && (
                        <p className="flex items-center gap-2 text-gray-700">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {[contact.address.city, contact.address.state]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      )}
                      {contact.notes && (
                        <p className="text-gray-600 italic mt-3 pt-3 border-t border-gray-200">
                          "{contact.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleEditContact(contact)}
                        className="flex-1 px-3 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
                        className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showForm && (
        <ContactForm
          contact={editingContact}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}
