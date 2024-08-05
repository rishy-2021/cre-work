import { AddTaskInput } from "@/components/ui/dashboard/task-mutation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const url = 'https://cre-work.vercel.app/api';
export const apiRequest = async (endpoint: string, method = 'GET') => {
  try {
    const res = await fetch(`${url}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiZWE5NWIwZGRhYmFlNDY0MzVlYjQiLCJpYXQiOjE3MjI3NTc5MDEsImV4cCI6MTcyMjc2MTUwMX0.2xgqK5p_brY_WogBz52W0xiKOobPXElrFNgSAH9REus`
      }
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      const errorMessage = errorResponse.message || 'An unexpected error occurred';

      // Show error toast
      // toast.error(`OOPS !! ${res.status}: ${errorMessage}`, {
      //   className: 'bg-red-600 text-white font-semibold px-4 py-3 rounded-lg',
      //   icon: '🫠',
      //   duration: 5000,
      // });

      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
export const createTask = async (task: Partial<AddTaskInput>): Promise<AddTaskInput> => {
  console.log(task, "-----------")
  const response = await fetch(`${url}/api/tasks/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache:"no-store",
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const updateTask = async (id: string, task: Partial<AddTaskInput>): Promise<AddTaskInput> => {
  const response = await fetch(`${url}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
