import React, { useState, useEffect, useRef } from 'react';

const UploadSlip: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
        setFile(selectedFile);
        setMessage('');
        }
    };

    useEffect(() => {
        if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
        } else {
        setPreviewUrl('');
        }
    }, [file]);

    const handleUpload = async () => {
    if (!file) {
        setMessage('Please upload a file.');
        return;
    }

    const formData = new FormData();
    formData.append('slip', file);

    try {
        const response = await fetch('https://inc34needmoney-production.up.railway.app/api/upload-slip', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setMessage('File uploaded successfully!');
            setPreviewUrl(`https://inc34needmoney-production.up.railway.app${data.fileUrl}`);
        } else {
            setMessage('Failed to upload file. Please try again.');
        }
    } catch {
        setMessage('An error occurred while uploading the file.');
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleDelete = () => {
        setFile(null);
        setMessage('');
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">Upload Payment Slip</h2>
            <h4 className="text-xs font-regular italic text-gray-400 mb-4">
                Supported formats: JPG, PNG, PDF
            </h4>

            <div className="bg-gray-100 rounded-lg p-4 w-full max-w-sm flex flex-col items-center">
                {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Slip Preview"
                    className="mb-2 max-w-full max-h-48 object-contain rounded"
                />
                )}

                <p className="text-sm mb-4 text-center text-gray-500">
                {file ? file.name : 'No file chosen'}
                </p>

                {/* Hidden native input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Buttons container */}
                <div className="flex space-x-4 mb-2">
                <button
                    type="button"
                    onClick={triggerFileInput}
                    className="bg-blue-600 text-white py-2 px-6 rounded shadow hover:bg-blue-800 transition"
                >
                    Choose File
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={!file}
                    className={`py-2 px-6 rounded border-2 transition ${
                    file
                        ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer'
                        : 'border-gray-300 text-gray-300 cursor-not-allowed'
                    }`}
                >
                    Delete
                </button>
                </div>
            </div>

            {/* Upload button */}
            <button
                onClick={handleUpload}
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded shadow w-full hover:bg-blue-800 transition">
                Upload
            </button>

            {message && (
                <p
                className={`mt-2 ${
                    message.includes('successfully') ? 'text-green-600' : 'text-red-500'
                }`}
                >
                {message}
                </p>
            )}
        </div>
    );
};

export default UploadSlip;
