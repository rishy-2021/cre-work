import { AddTaskInput, Task } from "@/components/ui/dashboard/task-mutation";
import { SignupFormData } from "@/types/auth/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const signUp = async (formData: SignupFormData): Promise<{token: string, username: string}> => {
  const response = await fetch(`${API_URL}/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache:"no-store",
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const signIn = async (formData: Partial<SignupFormData>): Promise<{token: string, username: string}> => {
  const response = await fetch(`${API_URL}/api/user/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache:"no-store",
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to create task');
  }
  return response.json();
};


export const fetchtasks = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/api/task`, {
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      cache:"no-store",
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
  const token = getToken();
  const response = await fetch(`${API_URL}/api/task/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
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

export const updateTask = async (id: string, task: Partial<AddTaskInput>): Promise<{message: string, mutatedTask: Task}> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/api/task/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const token = getToken();
  const response = await fetch(`${API_URL}/api/task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
