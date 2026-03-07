require("dotenv").config();
const axios = require("axios");

test("login API should return success", async () => {
    try {
        const response = await axios.post(`${process.env.API_BASE_URL}/api/login`, {
            email: process.env.TEST_USER_EMAIL,
            password: process.env.TEST_USER_PASSWORD
        });

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("success");
    } catch (error) {
        if (error.response) {
            expect(error.response.status).toBe(200);
            expect(error.response.data).toHaveProperty("success");
        } else {
            throw error;
        }
    }
});
