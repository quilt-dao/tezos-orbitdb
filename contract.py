import smartpy as sp


class KeyStorage(sp.Contract):
    def __init__(self):
        self.init(
            value=0,
            xkey=sp.big_map(l={}, tkey=sp.TAddress, tvalue=sp.TString),
            ykey=sp.big_map(l={}, tkey=sp.TAddress, tvalue=sp.TString)
        )

    @sp.entry_point
    def setUserKey(self, params):
        # Type constraining

        sp.set_type(params, sp.TRecord(_x=sp.TString, _y=sp.TString))
        add = sp.sender

        self.data.xkey[add] = params._x
        self.data.ykey[add] = params._y

    @sp.entry_point
    def getUserKey(self, userAddress):
        # Type constraining
        sp.set_type(userAddress, sp.TAddress)
        x = self.data.xkey[userAddress]
        y = self.data.ykey[userAddress]


if "templates" not in __name__:
    @sp.add_test(name="KeyStorage")
    def test():
        scenario = sp.test_scenario()

        # Create contract
        key = KeyStorage()
        scenario += key

        # Test address
        admin = sp.test_account("admin")
        alice = sp.test_account("alice")

        # change_num_values
        scenario.h1("Playground Test 1")
        scenario += key.setUserKey(_x="jhb", _y="kmjkm").run(sender=admin)
        scenario += key.getUserKey(admin.address)

    # sp.add_compilation_target("setUserKey_comp", setUserKey())
