const password_check = require('./passhasing'); // Import your function
const bcrypt = require('bcrypt'); // Import bcrypt  
jest.mock('bcrypt');
describe('password_check', () => {
it('should return true is password is correct',async()=>{
    
       const plainpassword="123hemant"
       const expectedpassword="123hemant"

       bcrypt.compare.mockResolvedValue(true);
       const t=await password_check(plainpassword,expectedpassword);
       expect(t).toBe(true);
    
});

it('should return flase is password is incorrect',async()=>{
    
    const plainpassword="12hemant"
    const expectedpassword="123hemant"

    bcrypt.compare.mockResolvedValue(false);
    const t=await password_check(plainpassword,expectedpassword);
    expect(t).toBe(false);
 
});
});