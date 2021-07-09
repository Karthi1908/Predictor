import smartpy as sp

class Predictor(sp.Contract):
    def __init__(self, admin):
        self.init(
            contract_owner = admin.address,
            contender_list = sp.set(),
            voting_snapshot = sp.map( tkey = sp.TString, tvalue = None),
            voting_closed = False,
            winner = " " ,
            count = 0
            )
            
    @sp.entry_point
    def add_contenders(self, x):
        sp.verify(sp.sender == self.data.contract_owner)
        self.data.contender_list.add(x)
    
    @sp.entry_point
    def voting(self, vote):
        sp.verify(self.data.contender_list.contains(vote))
        sp.if self.data.voting_snapshot.contains(vote):
            self.data.voting_snapshot[vote] += 1
        sp.else:
            self.data.voting_snapshot[vote] = 1
            
    @sp.entry_point
    def close_vote(self):
        
        sp.verify(sp.sender == self.data.contract_owner)
        self.data.voting_closed = True
        sp.for x in self.data.voting_snapshot.keys():
            sp.if (self.data.voting_snapshot[x] > self.data.count):
                self.data.count = self.data.voting_snapshot[x]
                self.data.winner = x
            
    
@sp.add_test(name = "Voting")
def test():
    user = sp.test_account('admin')
    predict = Predictor(admin=user)
    scenario = sp.test_scenario()
    scenario += predict
    scenario += predict.add_contenders("CSK").run(sender = user)
    scenario += predict.add_contenders("CSK").run(sender = user)
    scenario += predict.add_contenders("RCB").run(sender = user)
    scenario += predict.add_contenders("Draw").run(sender = user)
    scenario += predict.add_contenders("NR").run(sender = user)
    scenario += predict.voting("CSK")
    scenario += predict.voting("CK").run(valid=False)
    scenario += predict.voting("RCB")
    scenario += predict.voting("RCB")
    scenario += predict.voting("RCB")
    scenario += predict.voting("RCB")
    scenario += predict.voting("CSK")
    scenario += predict.voting("CSK")
    scenario += predict.voting("NR")
    scenario += predict.voting("Draw")
    scenario += predict.close_vote().run(sender=user)
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    