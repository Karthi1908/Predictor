import time
import smartpy as sp

class Crowdfunding(sp.Contract):
    def __init__(self, owner, min_amount, max_time, balance):
        self.init(
            funding_stat =sp.map(tkey=sp.TAddress, tvalue=None),
            contract_owner = owner,
            target_amount = min_amount,
            duration = max_time,
            fund_balance = balance
            )
            
    @sp.entry_point
    def send_fund(self):
        sp.verify(self.data.duration >= sp.now)
        sp.verify(~(self.data.funding_stat.contains(sp.sender)))
        self.data.funding_stat[sp.sender] = sp.amount
        self.data.fund_balance += sp.amount
        
    @sp.entry_point
    def pay_off(self):
        sp.verify(self.data.contract_owner == sp.sender)
        sp.verify(self.data.target_amount < sp.balance)
        sp.verify(self.data.duration < sp.now)
        sp.send(self.data.contract_owner, sp.balance)
        
    @sp.entry_point
    def refund(self):
        sp.verify(self.data.funding_stat.contains(sp.sender))
        sp.verify(self.data.target_amount > sp.balance)
        sp.verify(self.data.duration < sp.now)
        sp.send(sp.sender, self.data.funding_stat[sp.sender])
        self.data.fund_balance -= self.data.funding_stat[sp.sender]
        del self.data.funding_stat[sp.sender]
        
    @sp.entry_point
    def refund_all(self):
        sp.verify(self.data.contract_owner == sp.sender)
        sp.for i in self.data.funding_stat.keys():
            sp.send(i , self.data.funding_stat[i])
            self.data.fund_balance -= self.data.funding_stat[i]
            del self.data.funding_stat[i]
           
        
@sp.add_test(name="Trial 1")
def test_contract():
    
    admin = sp.address("tz1ZSrowNmVDE9WgXbyoLzBk9AciZfrrjTD7")
    user1 = sp.test_account("user1").address
    user2 = sp.test_account("user2").address
    user3 = sp.test_account("user3").address
    
    crowd_funding = Crowdfunding(owner=admin, min_amount=sp.tez(50) , max_time = sp.timestamp(int(time.time()) + 1000), balance = sp.mutez(0)) 
    scenario = sp.test_scenario()
    scenario += crowd_funding
    scenario += crowd_funding.send_fund().run(sender=user1, amount=sp.tez(4), now=sp.timestamp(int(time.time())+ 100))
    scenario += crowd_funding.send_fund().run(sender=admin, amount=sp.tez(3), now=sp.timestamp(int(time.time())+ 100))
    scenario += crowd_funding.send_fund().run(sender=user2, amount=sp.tez(20), now=sp.timestamp(int(time.time())+ 100))
    scenario += crowd_funding.send_fund().run(sender=user3, amount=sp.tez(10), now=sp.timestamp(int(time.time())+ 100))
    
    scenario += crowd_funding.refund().run(sender = admin,now=sp.timestamp(int(time.time())+ 2592505))
    


        
