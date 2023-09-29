document.addEventListener('DOMContentLoaded', function () {
    const startTimeInput = document.getElementById('start-hour');
    const startMinuteInput = document.getElementById('start-minute');
    const startAmPmSelect = document.getElementById('start-am-pm');
    const endTimeInput = document.getElementById('end-hour');
    const endMinuteInput = document.getElementById('end-minute');
    const endAmPmSelect = document.getElementById('end-am-pm');
    const calculateButton = document.getElementById('calculate');
    const totalHoursElement = document.getElementById('total-hours');
    const digitalClockElement = document.getElementById('digital-clock');

    function updateDigitalClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format

        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
        digitalClockElement.textContent = timeString;
    }

    function calculateTime() {
        const startHour = parseInt(startTimeInput.value);
        const startMinute = parseInt(startMinuteInput.value);
        const startAmPm = startAmPmSelect.value;
        const endHour = parseInt(endTimeInput.value);
        const endMinute = parseInt(endMinuteInput.value);
        const endAmPm = endAmPmSelect.value;

        if (!isNaN(startHour) && !isNaN(startMinute) && !isNaN(endHour) && !isNaN(endMinute)) {
            let adjustedStartHour = startHour;
            let adjustedEndHour = endHour;

            if (startAmPm === 'PM' && startHour !== 12) {
                adjustedStartHour += 12;
            }
            if (endAmPm === 'PM' && endHour !== 12) {
                adjustedEndHour += 12;
            }

            const startMinutes = adjustedStartHour * 60 + startMinute;
            const endMinutes = adjustedEndHour * 60 + endMinute;

            if (endMinutes >= startMinutes) {
                const totalMinutes = endMinutes - startMinutes;
                const totalHours = Math.floor(totalMinutes / 60);
                const totalMinutesDisplay = totalMinutes % 60;
                const totalTimeString = `${totalHours} hours ${totalMinutesDisplay} mins`;

                totalHoursElement.textContent = `Total Hours: ${totalTimeString}`;
            } else {
                totalHoursElement.textContent = 'Total Hours: Invalid input';
                alert('End time must be greater than or equal to start time.');
            }
        } else {
            totalHoursElement.textContent = 'Total Hours: Invalid input';
            alert('Invalid input. Please enter valid hours and minutes.');
        }
    }

    calculateButton.addEventListener('click', calculateTime);

    // Initial clock setup
    updateDigitalClock();
    setInterval(updateDigitalClock, 1000);
});