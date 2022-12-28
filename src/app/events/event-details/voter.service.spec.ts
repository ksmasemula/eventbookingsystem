import { of } from "rxjs";
import { ISession } from "../shared";
import { VoterService } from "./voter.service";

describe('Voter Service',()=>{
  let voterService:VoterService,
  mockHttp:any;

  beforeEach(()=>{
    mockHttp = jasmine.createSpyObj('mockHttp',['delete','post']);
    voterService = new VoterService(mockHttp);
  });

  describe('delete Voter',()=>{
    it('should remove the voter from the list of voters',()=>{
      let session = {id:6,voters:['joe','john']};
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, <ISession>session,"joe");

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');

    });

    it('should call the http.delete with the right URL',()=>{
      let session = {id:6,voters:['joe','john']};
      mockHttp.delete.and.returnValue(of(false));
      voterService.deleteVoter(3, <ISession>session,"joe");
      expect(mockHttp.delete).toHaveBeenCalledWith("/api/events/3/sessions/6/voters/joe");
    });

  })

  describe('add Voter',()=>{
    it('should add the voter to the list of voters',()=>{
      let session =  <ISession>{id:6,voters:['john']};
      mockHttp.post.and.returnValue(of(false));

      voterService.addVoter(3,session,"joe");

      expect(session.voters.length).toBe(2);
      // expect(session.voters[0]).toBe('john');

    });

    it('should call the http.post with the right URL',()=>{
      let session = {id:6,voters:['joe','john']};
      mockHttp.post.and.returnValue(of(false));
      voterService.addVoter(3, <ISession>session,"joe");
      expect(mockHttp.post).toHaveBeenCalledWith("/api/events/3/sessions/6/voters/joe",{},jasmine.any(Object));
    });
  })
});
