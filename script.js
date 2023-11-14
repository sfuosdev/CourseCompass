const baseUrl = 'http://www.sfu.ca/bin/wcm/course-outlines';

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }
}

function populateDropdown(selectElement, options) {
  selectElement.innerHTML = '';
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);
  });
}

async function populateYears() {
  const years = await fetchData('');
  if (years) {
    const yearSelect = document.getElementById('yearSelect');
    populateDropdown(yearSelect, years);
    populateTerms();
  }
}

async function populateTerms() {
  const yearSelect = document.getElementById('yearSelect');
  const selectedYear = yearSelect.value;
  const terms = await fetchData(`?${selectedYear}`);
  if (terms) {
    const termSelect = document.getElementById('termSelect');
    populateDropdown(termSelect, terms);
    populateDepartments();
  }
}

async function populateDepartments() {
  const yearSelect = document.getElementById('yearSelect').value;
  const termSelect = document.getElementById('termSelect').value;
  const departments = await fetchData(`?${yearSelect}/${termSelect}`);
  if (departments) {
    const departmentSelect = document.getElementById('departmentSelect');
    populateDropdown(departmentSelect, departments);
    populateCourseNumbers();
  }
}

async function populateCourseNumbers() {
  const yearSelect = document.getElementById('yearSelect').value;
  const termSelect = document.getElementById('termSelect').value;
  const departmentSelect = document.getElementById('departmentSelect').value;
  const courseNumbers = await fetchData(`?${yearSelect}/${termSelect}/${departmentSelect}`);
  if (courseNumbers) {
    const courseNumberSelect = document.getElementById('courseNumberSelect');
    populateDropdown(courseNumberSelect, courseNumbers);
    populateSections();
  }
}

async function populateSections() {
  const yearSelect = document.getElementById('yearSelect').value;
  const termSelect = document.getElementById('termSelect').value;
  const departmentSelect = document.getElementById('departmentSelect').value;
  const courseNumberSelect = document.getElementById('courseNumberSelect').value;
  const sections = await fetchData(`?${yearSelect}/${termSelect}/${departmentSelect}/${courseNumberSelect}`);
  if (sections) {
    const sectionSelect = document.getElementById('sectionSelect');
    populateDropdown(sectionSelect, sections);
  }
}

async function fetchCourseOutline() {
  const yearSelect = document.getElementById('yearSelect').value;
  const termSelect = document.getElementById('termSelect').value;
  const departmentSelect = document.getElementById('departmentSelect').value;
  const courseNumberSelect = document.getElementById('courseNumberSelect').value;
  const sectionSelect = document.getElementById('sectionSelect').value;

  const courseOutline = await fetchData(`?${yearSelect}/${termSelect}/${departmentSelect}/${courseNumberSelect}/${sectionSelect}`);
  if (courseOutline) {
    renderCourseOutline(courseOutline);
  }
}

function renderCourseOutline(courseOutline) {
  const courseOutlineDiv = document.getElementById('courseOutline');
  courseOutlineDiv.innerHTML = ''; // Clear previous content

  const outlineDetails = Object.entries(courseOutline).map(([key, value]) => {
    let detail = '';

    if (typeof value === 'object' && !Array.isArray(value)) {
      detail += `<strong>${key}:</strong><br>`;
      detail += renderObject(value);
    } else if (Array.isArray(value) && value.length > 0) {
      detail += `<strong>${key}:</strong><br>`;
      detail += renderArray(value);
    } else {
      detail += `<strong>${key}:</strong> ${value}<br>`;
    }

    return detail;
  }).join('');

  courseOutlineDiv.innerHTML = outlineDetails;
}

function renderObject(obj) {
  let details = '';
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      details += `<strong>${key}:</strong><br>`;
      details += renderObject(value);
    } else if (Array.isArray(value) && value.length > 0) {
      details += `<strong>${key}:</strong><br>`;
      details += renderArray(value);
    } else {
      details += `<strong>${key}:</strong> ${value}<br>`;
    }
  }
  return details;
}

function renderArray(arr) {
  let details = '';
  arr.forEach((item, index) => {
    details += `<strong>${index + 1}:</strong><br>`;
    if (typeof item === 'object' && !Array.isArray(item)) {
      details += renderObject(item);
    } else {
      details += `${item}<br>`;
    }
  });
  return details;
}

window.onload = function() {
  populateYears();
};
