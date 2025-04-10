import axios from 'axios';

const API_URL = 'http://localhost:3000';
const EMAIL = 'admin';
const PASSWORD = 'admin';

const loginAndCreateGadgets = async () => {
    try {
        // Step 1: Check if the server is running
        const serverResponse = await axios.get(`${API_URL}/health`);

        console.log('Server is running');

        // Step 2: Login
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: EMAIL,
            password: PASSWORD,
        });

        const token = loginResponse.data.token;

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        // Step 3: Create 50 gadgets
        for (let i = 1; i <= 50; i++) {
            const response = await axios.post(`${API_URL}/gadgets`, {}, { headers });

            const { name, status } = response.data;
            console.log(`[${i}] Created Gadget: ${name} - Status: ${status}`);
        }

    } catch (error) {
        if (error.errors.code) { }
        console.error('Server is not running', error.message);
    }
};

loginAndCreateGadgets();
