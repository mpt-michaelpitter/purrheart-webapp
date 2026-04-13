
// Use global declaration to persist data across hot-reloads in development
const globalForAuth = global as unknown as { userStore: any[] };

// Initialize store
if (!globalForAuth.userStore) {
    globalForAuth.userStore = [];
}

export const getUsers = () => {
    return globalForAuth.userStore;
};

export const getUserByEmail = (email: string) => {
    return globalForAuth.userStore.find((u) => u.email === email);
};

export const addUser = (user: any) => {
    // Check if email exists
    if (getUserByEmail(user.email)) {
        throw new Error("Email already exists");
    }

    // Simple password hashing simulation (in real app, use bcrypt)
    const newUser = {
        ...user,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString()
    };

    globalForAuth.userStore.push(newUser);
    return newUser;
};

export const validateUser = (email: string, password: string) => {
    const user = getUserByEmail(email);
    if (user && user.password === password) {
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};
