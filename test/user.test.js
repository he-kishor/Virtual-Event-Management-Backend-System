const register_user = require('../src/users/services/register_user'); // Import your function
const User_Model = require('../src/Models/userModel');
const bcrypt = require('bcrypt');

jest.mock('../src/Models/userModel'); // Mock the User_Model module
jest.mock('bcrypt'); // Mock bcrypt

describe('register_user', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('should throw an error if required fields are missing', async () => {
        try {
            await register_user({
                fname: 'John',
                lname: '  ',
                email: 'tell1@gmail.com',
                pass: '123456',
                role: 'user',
            });
        } catch (err) {
            expect(err.status).toBe(400);
            expect(err.message).toBe('Please provide all required fields');
        }
    });
    it('should throw an error is user is already exits',async()=>{
        User_Model.findOne.mockResolvedValue({
            fname: 'John',
            lname: 'verma',
            email: 'hemant272017@gmail.com',
            pass: 'hashedpassword',
            role: 'user',
            gender: 'Male'
        });
        try{
        await register_user({
            fname: 'John',
            lname: 'verma',
            email: 'hemant272017@gmail.com',
            pass: '123456',
            role: 'user',
            gender:"Male"
        });
    }
    catch(err){
        
        expect(err.status).toBe(400);
        expect(err.message).toBe('User already exits'); 
    }
    });

    it('User Succefully register',async()=>{
        const newUser = {
            _doc: {
                fname: 'John',
                lname: 'verma',
                email: 'testing1@gmail.com',
                role: 'user',
                gender: 'Male',
                birth_date: '',
                pass: 'hashedPassword',
                passwordChangedAt: Date.now(),
                resetPasswordOtp: '',
                otpExpires: Date.now(),
            },
        };
        User_Model.findOne.mockResolvedValue(null);
        User_Model.create.mockResolvedValue(newUser);
        bcrypt.hash.mockResolvedValue('hashedpassword');
        const user= await register_user({
            fname: 'John',
            lname: 'verma',
            email: 'testing1@gmail.com',
            pass: '123456',
            role: 'user',
            gender:"Male"
        });

        expect(user).toHaveProperty('fname', 'John');
        expect(user).toHaveProperty('lname', 'verma');
        expect(user).toHaveProperty('email', 'testing1@gmail.com');
        expect(User_Model.create).toHaveBeenCalledTimes(1); 
        

    });
   
});
