function showData() {
  var info = document.getElementById("info");
  var backend = document.getElementById("backend");
  var frontend = document.getElementById("frontend");
  var backendfrontend = document.getElementById("backendfrontend");
  var selectedDataList = document.getElementById("selectedData");

  var url = "data.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var selectedData = [];
      if (backend.checked) {
        selectedData = selectedData.concat(
          filterInternsBySkill(data.interns, "Back-end")
        );
      }
      if (frontend.checked) {
        selectedData = selectedData.concat(
          filterInternsBySkill(data.interns, "Front-end")
        );
      }
      if (backendfrontend.checked) {
        selectedData = selectedData.concat(
          filterInternsBySkill(data.interns, "Back-end and Front-end")
        );
      }

      if (selectedData.length > 0) {
        info.style.display = "block";
        selectedDataList.innerHTML = selectedData
          .map(
            (intern) => `
          <li>
            <img src="${intern.image}" alt="${intern.name}" style="width: 100px; height: auto;">
            <span>${intern.name}</span>
          </li>
        `
          )
          .join("");
      } else {
        info.style.display = "none";
      }
    })
    .catch((error) => console.error("Error loading data: ", error));
}

function filterInternsBySkill(interns, ...skills) {
  return interns.filter((intern) =>
    skills.every((skill) => intern.skills.includes(skill))
  );
}

const form = document.getElementById("dataForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const jsonData = {};

  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  // ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อบันทึกลงในไฟล์ JSON
  // ในที่นี้คุณต้องเขียนโค้ดสำหรับส่งข้อมูลไปยังเซิร์ฟเวอร์
  // และการบันทึกข้อมูลลงในไฟล์ JSON บนเซิร์ฟเวอร์ของคุณ

  // เมื่อข้อมูลถูกส่งสำเร็จ
  alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
});

function redirectToApplication() {
  window.location.href = "form.html";
}

function randomMath() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ); // ดึง input ที่ติกถูกมาทั้งหมด
  const selectedDataList = document.getElementById("selectedData");

  // เช็คว่ามีการเลือกอย่างน้อยหนึ่งอย่างหรือไม่
  if (checkboxes.length > 0) {
    // สร้างชื่อตามหัวข้อที่ติกถูกมาและเพิ่มลงในลิสต์
    checkboxes.forEach((checkbox) => {
      const name = checkbox.labels[0].textContent; // ดึงชื่อจาก label ของ checkbox
      const listItem = document.createElement("li");
      listItem.textContent = name;
      selectedDataList.appendChild(listItem);
    });
  } else {
    alert("กรุณาเลือกอย่างน้อยหนึ่งอย่าง");
  }
}

function randomMath() {
  const selectedSkills = []; // เก็บทักษะที่ถูกติกไว้

  // ดึงทักษะที่ถูกติกไว้
  if (document.getElementById('backend').checked) {
    selectedSkills.push('Back-end');
  }
  if (document.getElementById('frontend').checked) {
    selectedSkills.push('Front-end');
  }
  if (document.getElementById('backendfrontend').checked) {
    selectedSkills.push('Back-end and Front-end');
  }

  // หานักศึกษาที่มีทักษะตามที่เลือก
  const filteredInterns = data.interns.filter(intern => {
    return selectedSkills.some(skill => intern.skills.includes(skill));
  });

  // สุ่มเลือกนักศึกษา
  const randomIndex = Math.floor(Math.random() * filteredInterns.length);
  const selectedIntern = filteredInterns[randomIndex];

  // แสดงชื่อนักศึกษาที่ถูกสุ่ม
  const selectedDataList = document.getElementById('selectedData');
  selectedDataList.innerHTML = ''; // เคลียร์รายการที่แสดงอยู่ก่อนหน้า
  const listItem = document.createElement('li');
  listItem.textContent = selectedIntern.name;
  selectedDataList.appendChild(listItem);
}
