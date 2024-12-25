const login_user =require('../src/users/services/login_user');
const User_Model = require('../src/Models/userModel');
const bcrypt = require('bcrypt');

jest.mock('../src/Models/userModel');   
jest.mock('bcrypt');

describe('login_user',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    it('should throw an error is requires fields are missing',async()=>{
           try{
            await login_user({
                email: 'hemant272017@gmail.com',
                pass:''
           });
        }
        catch(err){
            expect(err.status).toBe(400);
            expect(err.message).toBe('Please provide all required fields');
     

           }
    });
    it('should throw an error if email is invalid',async()=>{
        User_Model.findOne.mockResolvedValue(null);
        try{
            await login_user({
                email: 'hemant272017@gmail',
                pass:'123456'});
            }
        catch(err){
            expect(err.status).toBe(400);
            expect(err.message).toBe('Invalid EmailID');
        }

    });

   it('should password invalid',async()=>{
    const mockUser={
        _doc:{
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
        }
    }
    User_Model.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);
    try{
        await login_user({email:'testing1@gmail.com',pass:'12345'});
    }
    catch(err){
        expect(err.status).toBe(400);
        expect(err.message).toBe('Invalid User');
    }
   });
});