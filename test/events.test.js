const create_event = require('../src/event_organise/services/create_event')
const Event_Model = require('../src/Models/organisemodel');

jest.mock('../src/Models/organisemodel');
   describe('Event_testing',()=>{
     beforeEach(()=>{
         jest.clearAllMocks();
     });
     
     it('User shouldnt have access to register the event', async()=>{
        const user_id = '123';
        const user_role = 'user'; // Invalid role
        const eventData = {
            e_name: 'Event1',
            e_details: 'Event1',
            event_time: '2023-12-01T10:00:00Z',
            event_add: 'Event1',
        };
        
        try{
            await create_event(user_id, user_role, eventData);

        }
        catch(err){
            expect(err.status).toBe(403);
            expect(err.message).toBe("This user doesn't have access to register the Event" );

        }
     });

     it('User shouldnt have access to register the event', async()=>{
        const user_id = '123';
        const user_role = 'org_user'; // Invalid role
        const eventData = {
            e_name: 'Event1',
            e_details: ' ',
            event_time: '2023-12-01T10:00:00Z',
            event_add: 'Event1',
        };
        
        try{
            await create_event(user_id, user_role, eventData);

        }
        catch(err){
            expect(err.status).toBe(400);
            expect(err.message).toBe("Please provide all required fields");

        }
     });

     it('User shouldnt have access to register the event', async()=>{
        const user_id = '123';
        const user_role = 'org_user'; // Invalid role
        const eventData = {
            e_name: 'Event1',
            e_details: 'Event1 details',
            event_time: '2023-12-01T10:00:00Z',
            event_add: 'Event1 Location',
        };
        const mockEvent = {
            _doc:{
                e_name: 'Event1',
                e_details: 'Event1 details',
                event_time: '2023-12-01T10:00:00Z',
                event_add: 'Event1 Location',
                capacity: 10,
                fill_seat: 0,
                fees: 500,
                o_id: user_id,
            }
     
        };
        Event_Model.create.mockResolvedValue(mockEvent);

        
        const result=await create_event(user_id, user_role, eventData);
        expect(Event_Model.create).toBeCalledWith({
            e_name: 'Event1',
            e_details: 'Event1 details',
            event_time: '2023-12-01T10:00:00Z',
            event_add: 'Event1 Location',
            capacity: 0,
            fill_seat: 0,
            fees: 0,
            o_id: '123',
        });
        expect(result).toEqual(mockEvent._doc);

       
     });

});