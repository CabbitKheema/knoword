<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CabbitKheema/knoword">
    <img src="/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">knoword</h3>

  <p align="center">
    A React SWC PWA on Vite, supported by <a href="https://github.com/CabbitKheema/knoword-backend"><strong>knoword-backend</strong></a> helping book readers quickly find meanings of unfamiliar words.
    <br />
    <a href="https://docs.google.com/document/d/1AWgcsuLVrC9QK1Y_xz1gr3drXJHQOMM1_HnaLJiHE3U/edit?usp=sharing"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ck-knoword.netlify.app/">View Demo</a>
    &middot;
    <a href="https://github.com/CabbitKheema/knoword/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/CabbitKheema/knoword/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://ck-knoword.netlify.app/)

Encountering unfamiliar words while reading books can disrupt the immersive experience, forcing readers to pause and search for meanings through dictionaries or online tools. The [knoword][knoword-url] PWA solves this problem by offering quick access to word definitions, origins, and usage contexts via text input or audio transcription. Supported by [knoword-backend][knoword-backend-url] APIs, it ensures users can effortlessly stay focused on their reading while resolving any doubts about word meanings. I think this is a great solution for all book readers.

Here's why:

* From typing to speaking, the PWA supports various ways users interact with it.
* It provides comprehensive definitions, origins, and usage contexts, saving time and effort.
* It handles audio file uploads, transcribing spoken words and providing their definitions. This is especially helpful for understanding unfamiliar words heard in conversations or audio content.
* It provides the html report generated by newman and newman-report-htmlextra
* Supported by [knoword-backend][knoword-backend-url] APIs, users can stay engaged with their reading while resolving their doubts instantly.

Thanks to all the tools and technologies mentioned in <a href="#acknowledgments">Acknowledgments</a> section below without which this project would've been incomplete! 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Node][Node.js]][Node-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![Redux][Redux]][Redux-url]
* [![React.js][React.js]][React-url]
* [![Vite][Vite]][Vite-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

1. Download and install nvm by checking this [github-repo](https://github.com/nvm-sh/nvm)
2. In order to download nvm for windows, click [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#important-notes)
3. Verify you have this command available in your shell and that the found version look similar to the below output:
   ```sh
   nvm -v
   
   1.2.2
   ```
4. Install the latest stable release of Node.js
   ```sh
   nvm install node
   ```
   > NPM is included with Node.js installation.

5. Update npm (if necessary)
   ```sh
   npm install npm@latest -g
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation 🌱 <a id="installation"></a>

1. Clone the repo
   ```sh
   git clone https://github.com/CabbitKheema/knoword.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Save this in root directory in a file titled `.env` and **follow the commented instructions** prefixed with ```//``` below
   
   ```js
   // Replace {backend-url} with the url that the backend is hosted on. 
   // Eg. http://localhost:3000 
   VITE_BACKEND_URL={backend-url}/api/v1
   VITE_BACKEND_REPORT_URL={backend-url}/report/v1

   VITE_MAX_AUDIO_DURATION_IN_SECONDS=15
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Deployment 🚀 <a id="deployment"></a>

* Start the client

   ```
   npm run dev

   > knoword@0.0.0 dev
   > vite


   VITE v6.0.7  ready in 1018 ms

   ➜  Local:   http://localhost:5000/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
   ```
   > Since PWA works only on https, in order to test PWA's features such as the offline mode and service worker update triggers, run the following command
   > ```
   > npm run serve
   > ```
   > This builds the project and hosts it using [https-localhost](https://github.com/daquinoaldo/https-localhost)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Kindly view this [Demo][knoword-demo-url] to use [knoword][knoword-url] PWA.

_For better understanding, please refer to the [knoWord Documentation][knoword-documentation-url]_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## **Roadmap**

### **Phase 1: Initial Setup**
- **Day 1: 04-01-2025**  
  - [x] Created a GitHub repository and pulled it locally using GitHub Desktop  
  - [x] Initialized a React SWC project using Vite  
  - [x] Researched PWA integration with Vite  
  - [x] Implemented PWA service worker but encountered issues with offline SVG loading  
  - [x] Fixed resource loading issues using the Vite PWA plugin  

### **Phase 2: UI Development**
- **Day 2-3: 05-01-2025 to 06-01-2025**  
  - [x] Installed Tailwind CSS, React Router, and React Icons  
  - [x] Created core pages: home, about, sign-in, and sign-up  
  - [x] Developed Header and Footer components  
  - [x] Completed the home page UI design  

- **Day 4: 07-01-2025**  
  - [x] Fixed UI bugs related to overlapping elements  
  - [x] Removed unnecessary blur effects  
  - [x] Implemented auto-scroll for text input  
  - [x] Improved responsiveness and hover effects for form inputs  

### **Phase 3: Word Meaning API Integration**
- **Day 5-6: 08-01-2025 to 09-01-2025**  
  - [x] Integrated **groq-sdk** to fetch word meanings via API calls to the llama-3.3-70b-versatile model  
  - [x] Created `FindWordMeaning.js` to process API responses  
  - [x] Updated Home page to handle word search and API calls  

- **Day 7: 10-01-2025**  
  - [x] Added input type selection (Text, Audio, Image)  
  - [x] Improved user experience by clearing text input after submission  
  - [x] Implemented a button to delete results  

- **Day 8: 11-01-2025**  
  - [x] Added a PWA update prompt to notify users about new builds  

### **Phase 4: Voice Search Integration**
- **Day 9: 12-01-2025**  
  - [x] Implemented audio-to-text support using **GroqCloud API** (calls whisper-large-v3-turbo model)  
  - [x] Created `VoiceNoteToText.js` for multilingual transcription  
  - [x] Added recording, playback, and delete audio features  

- **Day 10: 13-01-2025**  
  - [x] Improved speech input labels with transition effects  
  - [x] Fixed inconsistencies in icon styles  
  - [x] Introduced "Coming Soon" message for camera-based search  

### **Phase 5: State Management and Optimization**
- **Day 11: 14-01-2025**  
  - [x] Refactored code to optimize folder structure  
  - [x] Installed **Redux Toolkit** for global state management  
  - [x] Created centralized `enums.js` for predefined UI states  

- **Day 12: 15-01-2025**  
  - [x] Implemented Toast notifications for success and error handling  
  - [x] Improved API response handling using Promises  
  - [x] Displayed live transcription results for voice input  

- **Day 13: 16-01-2025**  
  - [x] Optimized rendering using `useMemo` and `useCallback`  

- **Day 14: 17-01-2025**  
  - [x] Moved "Find Word Meaning" API to a backend service  
  - [x] Refactored form handling with `react-hook-form` for better validation  

- **Day 15: 18-01-2025**  
  - [x] Replaced custom voice recording logic with `react-audio-voice-recorder`  
  - [x] Updated voice search component to fetch results from the backend  

### **Phase 6: Enhancements and Testing**
- **Day 16: 19-01-2025**  
  - [x] Implemented an audio duration limit.  
  - [x] Added a live countdown timer for recordings.  

- **Day 17-18: 20-01-2025 to 21-01-2025**  
  - [x] Created a button to display **Backend API Test Reports**  
  - [x] Automated **Netlify Deployment** on GitHub push/merge  
  - [x] Added error handling for missing or inaccessible microphones  

- **Day 19: 23-01-2025**  
  - [x] Fixed mobile UI bug where elements stayed in a "pressed" state after clicking  

### **Phase 7: Final Touches & Branding**
- **Day 20: 30-01-2025**  
  - [x] Improved PWA update prompt and fixed related bugs  
  - [x] Used `useRef` to prevent multiple update prompts  
  - [x] Changed app name to **"knoWord"** and added a new logo  

- **Day 21: 31-01-2025**  
  - [x] Updated Toast notifications with colored borders:  
    - [x] **Green** for success, **Red** for failure, **Blue** for prompts  

### **Phase 8: Documentation**
- **Day 22: 03-02-2025**
  - [x] Updated the README.md file:
    - [x] Added prerequisites, installation steps, roadmap, and usage details
    - [x] Included markdown badges for better visual appeal
    - [x] Referenced best practices for creating a README

---

### **Pending Tasks** 
- **Future Enhancements:**  
   - [ ] Implement image-based word recognition  
   - [ ] Improve test automation and monitoring
   - [ ] Create feature to allow users to use their own **GroqCloud API**  


See the [open issues](https://github.com/CabbitKheema/knoword/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/CabbitKheema/knoword/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=CabbitKheema/knoword" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Prajwal K - [@CabbitKheema](https://twitter.com/CabbitKheema) - <mrprajwalkrishnamurthy@gmail.com> - [HackerRank](https://www.hackerrank.com/profile/CabbitKheema)

Project Link: [https://github.com/CabbitKheema/knoword](https://github.com/CabbitKheema/knoword)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [My rough Roadmap Document](https://docs.google.com/document/d/1LWz7SRlS2lvbD2kdI6cgPz0Ggo97e0x6_pEbbUlZBnw/edit?tab=t.0)
* [React.js](https://react.dev/)
* [Speedy Web Compiler](https://swc.rs/)
* [Vite](https://vite.dev/)
* [Vite PWA](https://vite-pwa-org.netlify.app/)
* [A Beginner's Guide to Add PWA to Your Website Using Vite PWA](https://youtu.be/2tP4tMCoSV0?si=m6QDxHaN_GpfCFKZ)
* [Failed to load resources with vite pwa plugin in dev mode - Stack Overflow](https://stackoverflow.com/questions/77886982/failed-to-load-resources-with-vite-pwa-plugin-in-dev-mode)
* [Prompt for new content refreshing | Guide | Vite PWA](https://vite-pwa-org.netlify.app/guide/prompt-for-update)
* [Voice Recorder with React and Tailwind CSS](https://github.com/JoshuaZheng0/voice-recorder)
* [Build a Toast Notification Service purely in ReactJS and TailwindCSS](https://youtu.be/WDjWJA78Oic?si=R-LQr3sAaCIKxIc8)
* [Reference Vs Value In JavaScript](https://youtu.be/-hBJz2PPIVE?si=ZsVY7ZmXti8f1lta)
* [Learn useMemo In 10 Minutes](https://youtu.be/THL1OPn72vo?si=ykRKPaBpFsibOM8G)
* [Learn useCallback In 8 Minutes](https://youtu.be/_AyFP5s69N4?si=d0ITF8yA-JWMQNT5)
* [Get started with React Hook Form](https://react-hook-form.com/get-started)
* [React Hook Form in 1 Video](https://youtu.be/wB3Jf7yyvfU?si=NKvFOM0sEzucwUY6)
* [Photo Editor Pixlr Free Photoshop online Image Editing Tool](https://pixlr.com/editor/)
* [Favicon Generator](https://favicon.inbrowser.app/tools/favicon-generator)
* [MARKDOWN SYNTAX](https://enterprise.github.com/downloads/en/markdown-cheatsheet.pdf)
* [Best README template by Othneil Drew](https://github.com/othneildrew/Best-README-Template/tree/main?tab=readme-ov-file#installation)
* [Markdown Guide | Basic Syntax](https://markdownguide.offshoot.io/basic-syntax/)
* [List of useful Markdown Badges](https://ileriayo.github.io/markdown-badges/)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[knoword-demo-url]: https://ck-knoword.netlify.app/
[knoword-documentation-url]: https://docs.google.com/document/d/1AWgcsuLVrC9QK1Y_xz1gr3drXJHQOMM1_HnaLJiHE3U/edit?usp=sharing
[knoword-tests-collection-url]: https://www.postman.com/science-physicist-1938228/workspace/knoword/collection/41172600-bc0af1e9-b249-4415-af88-5dfbc6efb759?action=share&creator=41172600&active-environment=41172600-d7a3beb2-5d06-448b-b351-9d68620b0e50
[fork-knoword-tests-collection-url]: https://app.getpostman.com/run-collection/41172600-bc0af1e9-b249-4415-af88-5dfbc6efb759?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D41172600-bc0af1e9-b249-4415-af88-5dfbc6efb759%26entityType%3Dcollection%26workspaceId%3D83711707-5270-464c-8e5e-00a5e3fd2209#?env%5BknoWord_backend_local%5D=W3sia2V5IjoiQkFDS0VORF9VUkwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiY29tcGxldGVTZXNzaW9uVmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJzZXNzaW9uSW5kZXgiOjB9XQ==
[knoword-tests-documentation-url]: https://www.postman.com/science-physicist-1938228/knoword/documentation/08isa39/knoword-tests
[knoword-url]: https://github.com/CabbitKheema/knoword
[knoword-backend-url]: https://github.com/CabbitKheema/knoword-backend
[contributors-shield]: https://img.shields.io/github/contributors/CabbitKheema/knoword.svg?style=for-the-badge
[contributors-url]: https://github.com/CabbitKheema/knoword/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CabbitKheema/knoword.svg?style=for-the-badge
[forks-url]: https://github.com/CabbitKheema/knoword/network/members
[stars-shield]: https://img.shields.io/github/stars/CabbitKheema/knoword.svg?style=for-the-badge
[stars-url]: https://github.com/CabbitKheema/knoword/stargazers
[issues-shield]: https://img.shields.io/github/issues/CabbitKheema/knoword.svg?style=for-the-badge
[issues-url]: https://github.com/CabbitKheema/knoword/issues
[license-shield]: https://img.shields.io/github/license/CabbitKheema/knoword.svg?style=for-the-badge
[license-url]: https://github.com/CabbitKheema/knoword/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/mr-prajwal-k
[product-screenshot]: /screenshot.png
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://nodejs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vite.dev/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Redux]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/