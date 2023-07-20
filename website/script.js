
// fetch method used to read the people.json data
fetch("./iconsSet.json")
  .then(response => response.json())
  .then(data => {
    // get the parent div for rendering the icons
    let iconWrapper = document.getElementById("icon-wrapper");
    let div = "";
    // loop used to read all the data from people.json
    for (let j = 0; j < data.length; j++) {
      div += `
      <div class="shadow-soft py-3 me-3 mb-4" onclick="iconCopy('<i class=&quot;${data[j].icon}&quot;></i>')">
        <i class=${data[j].icon}></i>
        <p>${data[j].name}</p>
        <div class="icon-div" id="iconTextToCopy${j}"><i class=${data[j].icon}></i></div>
        </div>
      `
    }
    document.getElementById("icon-wrapper").innerHTML = div;

  })

// Function For Document Content Loaded 
document.addEventListener('DOMContentLoaded', () => {
  const iconContainers = document.querySelectorAll('.icon');
  const tooltipText = document.querySelectorAll('.tooltip-text');
  const codeElements = document.querySelectorAll('code');

  iconContainers.forEach((iconContainer, index) => {
    iconContainer.addEventListener('click', () => {
      const text = codeElements[index].textContent;
      document.execCommand('copy');
      navigator.clipboard.writeText(text);

      const range = document.createRange();
      range.selectNodeContents(codeElements[index]);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      tooltipText[index].textContent = 'Copied!';
      tooltipText[index].style.visibility = 'visible';

      iconContainer.querySelector('img').src = 'https://svgshare.com/i/v7H.svg';
      iconContainer.style.height = '40px';

      setTimeout(() => {
        tooltipText[index].textContent = 'Click to Copy';
        tooltipText[index].style.visibility = 'hidden';
        iconContainer.querySelector('img').src = 'https://i.ibb.co/Jzrg63c/image-removebg-preview-1.png';
        selection.removeRange(range);
      }, 500);
    });
  });
});

// Function for Icon Copy When Click Action happens on Particular Icon
function iconCopy(icon) {
      navigator.clipboard.writeText(icon).then(() => {
        iziToast.success({
          timeout: 5000,
          position: 'bottomCenter',
          progressBar: false,
          message: 'Icon Copied!'
        });
      });
    }
 
//  Importing search helper function to implement it here! -->
function searchIcon() {

      // THRESHOLD while checking for values, 1 means exact match, 0 means all
      // Try experimenting with it before use THRESHOLD between range of 0.7 to 0.9 is recommended
      const THRESHOLD = 0.8;

      var input, filter, p, ul, li, a, i, txtValue;

      input = document.getElementById("searchInput");
      filter = input.value.toUpperCase();

      ul = document.getElementById("myUL");
      li = ul.getElementsByClassName("shadow-soft");

      var found_count = 0;

      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || a.innerText;

        // Matching based on fuzzy search
        if (jaroWinklerSimilarity(filter.toLowerCase(), txtValue.toLowerCase()) >= THRESHOLD || filter == "") {
          li[i].style.display = "";
          found_count++;
        } else {
          li[i].style.display = "none";
        }
      }
      if (found_count > 0) {
        document.querySelector(".notFound").classList.add("display");
      }
      else {
        document.querySelector(".notFound").classList.remove("display");
      }
    }

//  Function for enabling dark mode 
  
    const darkModeToggle = document.querySelector(".switch");
    const theme = document.querySelector("#theme-link");

    darkModeToggle.addEventListener("change", function () {
      if (darkModeToggle.checked) {
        theme.href = "style-dark.css";
      } else {
        theme.href = "style.css";
      }
    });


 // Function for Enabling Light Mode 

    const btn = document.querySelector(".btn-toggle");
    const footer = document.getElementById("custom-footer")

    btn.addEventListener("click", function () {
      // Swap out the URL for the different stylesheets
      if (theme.getAttribute("href") == "style.css") {
        theme.href = "style-dark.css";
        btn.textContent = "Light Mode";


      } else {
        theme.href = "style.css";
        btn.textContent = "Dark Mode";
      }

      footer.classList.toggle("dark-color")
      footer.classList.toggle("light-color")


    });

