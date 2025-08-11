// Making the navigation table change when scrolled past a point
window.addEventListener('scroll', function() {
    let navigationTable = document.getElementById('navigation');
    if (window.scrollY > 700) { 
        navigationTable.classList.add('nav-scroll');
    } else {
        navigationTable.classList.remove('nav-scroll');
    }
});

// Form submission
const reservationForm = document.getElementById("reservation-form");//to access the form id element
if (reservationForm) {
    reservationForm.addEventListener("submit", function(event) {
        // Prevent default submission of the form incase the page reloads
        event.preventDefault();
        
        // Get values from the form
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let checkInDate = new Date(document.getElementById("date-in").value);
        let checkOutDate = new Date(document.getElementById("date-out").value);
        let roomType = document.getElementById("room-type").value;

        // Calculate number of days to be stayed in the room
        let oneDay = 24 * 60 * 60 * 1000; 
        let numberOfDays = Math.round((checkOutDate - checkInDate) / oneDay);
        
        // Calculate total price depending on the room
        let pricePerDay; 
        if(roomType === "single") {
            pricePerDay = 50000;
        } else if(roomType === "double") {
            pricePerDay = 70000;
        } else { 
            pricePerDay = 95000;
        }
        let totalPrice = pricePerDay * numberOfDays;

        // Redirect to confirmation page with query parameters
        window.location.href = "confirmation.html?name=" + name +
                                "&email=" + email +
                                "&phone=" + phone +
                                "&checkInDate=" + checkInDate.toDateString() +
                                "&checkOutDate=" + checkOutDate.toDateString() +
                                "&numberOfDays=" + numberOfDays +
                                "&roomType=" + roomType +
                                "&totalPrice=" + totalPrice;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const reservationDetailsDiv = document.getElementById('reservation-details');

    if (queryParams.has('name') && queryParams.has('email') && queryParams.has('phone') &&
        queryParams.has('checkInDate') && queryParams.has('checkOutDate') && 
        queryParams.has('numberOfDays') && queryParams.has('roomType') && queryParams.has('totalPrice')) {
        const html = `
            <p>Name: ${queryParams.get('name')}</p>
            <p>Email: ${queryParams.get('email')}</p>
            <p>Phone: ${queryParams.get('phone')}</p>
            <p>Check In Date: ${queryParams.get('checkInDate')}</p>
            <p>Check Out Date: ${queryParams.get('checkOutDate')}</p>
            <p>Number of Days: ${queryParams.get('numberOfDays')}</p>
            <p>Room Type: ${queryParams.get('roomType')}</p>
            <p>Total Price: UGX${queryParams.get('totalPrice')}</p>
        `;
        reservationDetailsDiv.innerHTML = html;
    } else {
        reservationDetailsDiv.innerHTML = "<p>No reservation details found.</p>";
    }
});