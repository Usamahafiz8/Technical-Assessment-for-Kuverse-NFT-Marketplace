const staff_address_selector = $('#staff_address');
const staff_login_selector = $('#staff_login_btn');
const staff_logout_selector = $('#staff_logout_btn');

$(function () {
    web3Init();
});

async function web3Init() {
    // Init Web3 connected to ETH
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            window.localStorage.setItem("staffAddress", accounts[0]);
        } catch (e) {
            console.error(e);
        }
        // Load in Localstorage
        window.staffAddress = window.localStorage.getItem("staffAddress");
        showStaffAddress();
    } else {
        alert("No Wallet browser extension detected.");
    }
}

function showStaffAddress() {
    if (!window.staffAddress) {
        staff_address_selector.val('');
        staff_logout_selector.css('display', 'none');
        staff_login_selector.css('display', 'initial');
        return false;
    }
    staff_address_selector.val(window.staffAddress);
    staff_logout_selector.css('display', 'initial');
    staff_login_selector.css('display', 'none');
}

function staffLogout() {
    window.staffAddress = null;
    window.localStorage.removeItem("staffAddress");
    showStaffAddress();
}
function handleCollectionImg () {

}
function closeCollectionImg() {

}