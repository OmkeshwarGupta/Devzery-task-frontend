import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestCaseList = () => {
    const [testCases, setTestCases] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:5000/testcases')
            .then(response => {
                setTestCases(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the test cases!', error);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        const now = new Date().toUTCString(); // Get the current time in UTC format
        axios.put(`http://localhost:5000/testcases/${id}`, { status: newStatus })
            .then(response => {
                console.log(response.data.message);
                // Update local state to reflect the status change and timestamp
                setTestCases(prevTestCases =>
                    prevTestCases.map(testCase =>
                        testCase.id === id ? { ...testCase, status: newStatus, last_updated: now } : testCase
                    )
                );
            })
            .catch(error => {
                console.error('There was an error updating the test case status!', error);
            });
    };

    return (
        <div className='flex justify-center'>
            <div className='w-full max-w-3xl border rounded-lg text-gray-300 overflow-hidden'>
                <div className='w-full h-16 bg-blue-900 rounded-lg grid grid-cols-custom text-center'>
                    <p className="px-4 py-2">Test Case Name</p>
                    <p className="px-4 py-2">Estimate Time<br /><span className='text-xs'>(In Minutes)</span></p>
                    <p className="px-4 py-2">Module</p>
                    <p className="px-4 py-2">Priority</p>
                    <p className="px-4 py-2">Status</p>
                </div>

                {testCases.map((testCase) => (
                    <div key={testCase.id} className='grid grid-cols-custom text-center p-4 items-center'>
                        <div className='text-left relative'>
                            <p className='text-[10px]'>{`Test Case ID: ${testCase.id}`}</p>
                            <div className='mt-1 w-full h-20 bg-blue-900 rounded-md'></div>
                            <p className='absolute bottom-1 left-1 text-[10px]'>{`Last Updated: ${testCase.last_updated}`}</p>
                        </div>
                        <div>
                            <p>{`${testCase.estimate_time} Minutes`}</p>
                        </div>
                        <div>
                            <p>{testCase.module}</p>
                        </div>
                        <div>
                            <p>{testCase.priority}</p>
                        </div>
                        <div>
                            <select
                                className="p-2 rounded bg-blue-900 text-white w-20"
                                value={testCase.status}
                                onChange={(e) => handleStatusChange(testCase.id, e.target.value)}
                            >
                                <option className="bg-purple-500 text-black" value="Select">Select</option>
                                <option className="bg-purple-500 text-black" value="PASS">PASS</option>
                                <option className="bg-purple-500 text-black" value="FAIL">FAIL</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestCaseList;
