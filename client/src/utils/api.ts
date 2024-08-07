import { AddTaskInput } from "@/components/ui/dashboard/task-mutation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const fetchtasks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFiZWE5NWIwZGRhYmFlNDY0MzVlYjQiLCJpYXQiOjE3MjI3NTc5MDEsImV4cCI6MTcyMjc2MTUwMX0.2xgqK5p_brY_WogBz52W0xiKOobPXElrFNgSAH9REus`
      }
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'An unexpected error occurred';
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
export const createTask = async (task: Partial<AddTaskInput>): Promise<AddTaskInput> => {
  console.log(task, "-----------")
  const response = await fetch(`${API_URL}/api/tasks/add`, {
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
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
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
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
