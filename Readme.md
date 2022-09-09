<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/msnisha/mockware">
    <img src="images/logo.png" alt="Logo" >
  </a>

  <h3 align="center">Mockware</h3>

  <p align="center">
    An awesome Pega Community Hackathon 2022 Project!
    <br />
    <a href="https://demo.mockware.xyz">View Demo</a>
    ·
    <a href="https://github.com/msnisha/mockware/issues">Report Bug</a>
    ·
    <a href="https://github.com/msnisha/mockware/issues">Request Feature</a>
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
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://demo.mockware.xyz)

I wanted to use the Pega Community Hackathon 2022 as an opportunity to build something more impactful and helps to wider Pega community.
Building a domains specific applications will help to demostrate Pega's features but cannot be used by as it is as eash business is unique in their process. So I choose to build a domain agnostic Pega component application which can be easily plugged in to any existingor new Pega applications across many business domain. Working in Pega more than 15 years I have built many Pega components some of them includes QR code scanner component for allowing Pega running on mobile browser to scan codes, component to support browser native push notification in Pega, A component for text extraction using teserract.

This time I choose to build a Pega component to provide a smart mock service provider component for Pega. As more and more companies prefer micro service architecture the integrations are crusial part of all the pega projects as Pega is the orchestrator for many business process applications. Many times we feel the need of stub service to unblock our development and testing.

Here's some scenarion where a mock service is needed:

- Running scheduled automation testing without mutating the actual data.
- Missing actual data for satisfying some scenarios where testing needs to be performed
- The actual service is not yet available, but the Pega implementation and testing needs to continue
- Needs to easily replicate a production bug for further analyze in lower environment by mimicking the data to match production scenario.
- Testing the applications for different behaviors when the data is not controlled by the organization something like weather data or stock market data.
- Testing exceptional / error scenarios
- Testing how the application reacts to performance issues from service. (By adding delays to the stub responses)

![Deployment Diagram][diagram-image]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The Mockware application contains two parts. One part is a Pega component built in Pega 8 and the other part is a front end application
build on React JS.

- [![React][react.js]][react-url]
- <img src="https://www.pega.com/themes/custom/pegawww_theme/images/pega-logo.svg" width="86" title="Pega logo" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/msnisha/
[product-screenshot]: images/screenshot.png
[diagram-image]: images/diagram.jpg
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[pega-url]: https://pega.com/
