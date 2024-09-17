document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.querySelector('.calendar-container');
    const calendarGrid = calendarContainer.querySelector('.calendar-grid');
    const calendarCurrentDate = calendarContainer.querySelector('.calendar-current-date');
    const calendarPrev = calendarContainer.querySelector('.calendar-prev');
    const calendarNext = calendarContainer.querySelector('.calendar-next');

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        calendarCurrentDate.textContent = `${year} 年 ${month + 1} 月`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();

        calendarGrid.innerHTML = '';

        for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('calendar-grid-day');
        day.textContent = i;
        day.dataset.date = i;

        if (hasEvent(year, month, i)) {
            day.classList.add('has-event');
        }

        calendarGrid.appendChild(day);
        }

        for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-grid-day');
        calendarGrid.insertBefore(emptyDay, calendarGrid.firstChild);
        }
    }

    function hasEvent(year, month, day) {
        return calendar.events.some(event => 
        event.date.year === year &&
        event.date.month === month + 1 &&
        event.date.day === day
        );
    }

    calendarPrev.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    calendarNext.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
