export default async function updateUserProfile(profileData) {
    try {
        console.log(1);
        const response = await fetch('https://localhost:7011/api/updateuserdata', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Добавьте необходимые заголовки, например, для аутентификации
                // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        console.log('Profile updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Failed to update profile:', error);
    }
}