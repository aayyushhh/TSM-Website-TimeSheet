document.getElementById('addActivity').onclick = function() {
    const activityContainer = document.getElementById('activityContainer');
    const newActivity = document.createElement('div');
    newActivity.classList.add('activity');
    newActivity.innerHTML = `
        <input type="text" placeholder="Project" class="project" required>
        <input type="text" placeholder="Sub Project" class="subProject" required>
        <input type="text" placeholder="Batch" class="batch" required>
        <input type="number" placeholder="Hours Needed" class="hoursNeeded" required>
        <input type="text" placeholder="Activity Description" class="activityDescription" required>
        <button class="removeActivity">Remove</button>
    `;
    activityContainer.appendChild(newActivity);

    newActivity.querySelector('.removeActivity').onclick = function() {
        activityContainer.removeChild(newActivity);
    };
};

document.getElementById('saveButton').onclick = async function() {
    const dateValue = document.getElementById('dateValue').value;
    const isOnLeave = document.getElementById('isOnLeave').checked;

    const dateModel = {
        dateValue: dateValue,
        isOnLeave: isOnLeave,
        activities: []
    };

    const activities = document.querySelectorAll('.activity');
    activities.forEach(activity => {
        const activityData = {
            project: activity.querySelector('.project').value,
            subProject: activity.querySelector('.subProject').value,
            batch: activity.querySelector('.batch').value,
            hoursNeeded: parseInt(activity.querySelector('.hoursNeeded').value),
            activityDescription: activity.querySelector('.activityDescription').value,
            dateId: 0
        };
        dateModel.activities.push(activityData);
    });

    try {
        const response = await fetch('https://localhost:7015/api/DateModel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dateModel),
        });
        if (response.ok) {
            alert('Date and activities saved successfully!');
            // Clear the form if needed
            document.getElementById('dateValue').value = '';
            document.getElementById('isOnLeave').checked = false;
            document.getElementById('activityContainer').innerHTML = ''; // Clear activities
            document.getElementById('addActivity').click(); // Add default activity
        } else {
            alert('Failed to save. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving data.');
    }
};

document.getElementById('showActivities').onclick = async function() {
const activityList = document.getElementById('activityList');
activityList.innerHTML = ''; // Clear previous results

try {
    const response = await fetch('https://localhost:7015/api/DateModel'); // Your API endpoint
    if (response.ok) {
        const data = await response.json();
        data.forEach(dateEntry => {
            const dateDiv = document.createElement('div');
            dateDiv.innerHTML = `<strong>Date:</strong> ${dateEntry.dateValue} <strong>On Leave:</strong> ${dateEntry.isOnLeave ? 'Yes' : 'No'}<br>`;
            
            if (dateEntry.activities && dateEntry.activities.length > 0) {
                dateDiv.innerHTML += '<strong>Activities:</strong><ul>';
                dateEntry.activities.forEach(activity => {
                    dateDiv.innerHTML += `<li>${activity.project} - ${activity.activityDescription} (Hours Needed: ${activity.hoursNeeded})</li>`;
                });
                dateDiv.innerHTML += '</ul>';
            } else {
                dateDiv.innerHTML += '<strong>No activities available.</strong>';
            }
            
            activityList.appendChild(dateDiv);
        });
    } else {
        alert('Failed to retrieve activities.');
    }
} catch (error) {
    console.error('Error:', error);
    alert('Error retrieving data.');
}
};


document.getElementById('deleteButton').onclick = async function() {
    const deleteDateId = document.getElementById('deleteDateId').value;

    if (!deleteDateId) {
        alert('Please enter a Date ID.');
        return;
    }

    try {
        const response = await fetch(`https://localhost:7015/api/DateModel/${deleteDateId}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            alert('Activity deleted successfully!');
            document.getElementById('deleteDateId').value = '';
        } else {
            alert('Failed to delete. Please check the Date ID and try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting data.');
    }
};
