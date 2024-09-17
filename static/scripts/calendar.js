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

        const calendarDays = calendarGrid.querySelectorAll('.calendar-grid-day');

        calendarDays.forEach((day, index) => {
            day.textContent = '';
            day.classList.remove('has-event', 'is-today', 'is-empty');

            const dayOfMonth = index - firstDayOfWeek + 1;
            if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
                day.textContent = dayOfMonth;
                day.dataset.date = dayOfMonth;

                if (hasEvent(year, month, dayOfMonth)) {
                    day.classList.add('has-event');
                }

                if (isToday(year, month, dayOfMonth)) {
                    day.classList.add('is-today');
                }
            } else {
                day.classList.add('is-empty');
            }
        });
    }

    function hasEvent(year, month, day) {
        return calendar.events.some(event => 
        event.date.year === year &&
        event.date.month === month + 1 &&
        event.date.day === day
        );
    }

    function isToday(year, month, day) {
        const today = new Date();
        return (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
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
