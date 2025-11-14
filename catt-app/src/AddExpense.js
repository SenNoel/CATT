import { useState } from "react";

// List of categories for the dropdown
const categories = [
  "Food",
  "Rent",
  "Social",
  "Transport",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Utilities",
  "Other",
];

export function AddExpense() {
  // State hooks to manage form inputs
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  
  // Set default date and time to now
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  
  const [notes, setNotes] = useState("");

  // Function to handle the save button click
  const handleSave = (e) => {
    // Prevents the form from reloading the page
    e.preventDefault(); 
    
    // Basic validation
    if (!amount || !category) {
      alert("Please fill in amount and category"); // Replaced toast with alert
      return;
    }

    // ---
    // TODO: Add your logic here to send the data to the backend (Python API)
    // ---

    // Show success message
    alert(`Expense of $${amount} saved successfully!`); // Replaced toast with alert
    
    // Reset form fields
    setAmount("");
    setCategory("");
    setDate(new Date().toISOString().split('T')[0]);
    setTime(new Date().toTimeString().slice(0, 5));
    setNotes("");
  };

  // We use a <form> element and its onSubmit handler
  // <div className="card"> is replaced with <div style={{...}}>
  return (
    <form onSubmit={handleSave} style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
    }}>
      
      <h2 style={{ marginBottom: '24px' }}>Add New Expense</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Amount Input */}
        <div>
          <label htmlFor="amount" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Amount</label>
          {/* We add the $ sign using a simple div wrapper */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '10px', fontSize: '20px', color: '#888' }}>$</span>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: '12px 12px 12px 30px', fontSize: '20px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '12px', width: '100%', boxSizing: 'border-box' }}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label htmlFor="date" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: '12px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="time" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Time</label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ padding: '12px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Notes (Optional)</label>
          <textarea
            id="notes"
            placeholder="Add a note about this expense..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ minHeight: '80px', width: '100%', boxSizing: 'border-box', padding: '10px' }}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit" // Use type="submit" for a form
        style={{ 
          marginTop: '24px', 
          width: '100%', 
          padding: '14px', 
          fontSize: '16px', 
          fontWeight: '600',
          color: 'white',
          backgroundColor: '#007bff', // Blue color
          border: 'none', 
          borderRadius: '6px',
          cursor: 'pointer' 
        }}
      >
        Save Expense
      </button>
      
    </form>
  );
}