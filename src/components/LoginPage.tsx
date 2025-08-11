import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import readExcelFile from 'read-excel-file';
import { useAppContext } from '../contexts/AppContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { setUserName } = useAppContext();

  // Helper function to fetch and read Excel file from public folder
  const loadExcelFromPublic = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const file = new File([blob], 'check.xlsx', { type: blob.type });
    return readExcelFile(file);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const studentsRaw = await loadExcelFromPublic('/check.xlsx');

      // First row is header (e.g., ['Student ID'])
      const headers = studentsRaw[0];

      // Map rows (except header) to objects with keys from headers
      const students = studentsRaw.slice(1).map((row: any[]) => {
        const obj: { [key: string]: any } = {};
        headers.forEach((header, index) => {
          obj[String(header)] = row[index];
        });
        return obj;
      });

      // Find user where both username and password match the same Student ID
      const user = students.find(
        (student) =>
          student['Student ID']?.toString().trim() === username.trim() &&
          student['Student ID']?.toString().trim() === password.trim()
      );

      if (user) {
        setUserName(username); // Set username in context
        history.push('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      setError('Error reading the Excel file');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
