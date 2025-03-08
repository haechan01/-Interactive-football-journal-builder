import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface EditorProps {
  initialContent?: string;
  initialTitle?: string;
  journalId?: number;
  isEditing?: boolean;
}

const Editor = ({ initialContent = '', initialTitle = '', journalId, isEditing = false }: EditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    
    try {
      setSaving(true);
      
      // In a real app, you would call your API here
      // For this example, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the journals list page after saving
      navigate('/journals');
    } catch (err) {
      setError('Failed to save journal');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="card">
      <h2 className="section-title">
        {isEditing ? 'Edit Journal' : 'Create New Journal'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="label">Title</label>
          <input
            id="title"
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            disabled={saving}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content" className="label">Content</label>
          <textarea
            id="content"
            className="input min-h-[300px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your journal entry here..."
            disabled={saving}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="btn-secondary mr-2"
            onClick={() => navigate('/journals')}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : isEditing ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
