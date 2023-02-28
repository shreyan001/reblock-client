import * as fcl from "@onflow/fcl";

const authenticateUser = async (contractAddress) => {
  try {
    const response = await fcl.send([
      fcl.script`
        import FlowToken from 0xFlowToken

        pub fun main(): [Address] {
          let acct = getAccount(${contractAddress})
          let authorized = acct.getCapability<&FlowToken.Vault{FlowToken.Receiver}>(/public/flowTokenReceiver).borrow()?.getApprovedIds()
          return authorized ?? []
        }
      `,
    ]);

    const authorizedIds = await fcl.decode(response);

    const currentUser = fcl.currentUser();
    const isAuthorized = authorizedIds.includes(currentUser.addr);

    return isAuthorized;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false;
  }
};
export default authenticateUser;