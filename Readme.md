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
        <li><a href="#built-with">The History</a></li>
        <li><a href="#built-with">The Technical Details</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installation">Configurations</a></li>
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

Mockware is a Pega component application with modern React JS front end to provide smart mock/stub services for Pega integrations. Before getting down to the technical, lets go through the reason for choosing the project and the benefit it brings.

### The History

I wanted to use the Pega Community Hackathon 2022 as an opportunity to build something more impactful and helps to wider Pega community.
Building a domains specific applications will help to demostrate Pega's features but cannot be used by as it is as eash business is unique in their process. So I choose to build a domain agnostic Pega component application which can be easily plugged in to any existingor new Pega applications across many business domain. Working in Pega more than 15 years I have built many Pega components some of them includes QR code scanner component for allowing Pega running on mobile browser to scan codes, component to support browser native push notification in Pega, A component for text extraction using teserract.

This time I choose to build a Pega component to provide a smart mock service provider component for Pega. As more and more companies prefer micro service architecture the integrations are crusial part of all the pega projects as Pega is the orchestrator for many business process applications. Many times we feel the need of stub service to unblock our development and testing.

Here's some scenario where a mock service is needed:

- Running scheduled automation testing without mutating the actual data.
- Missing actual data for satisfying some scenarios where testing needs to be performed
- The actual service is not yet available, but the Pega implementation and testing needs to continue
- Needs to easily replicate a production bug for further analyze in lower environment by mimicking the data to match production scenario.
- Testing the applications for different behaviors when the data is not controlled by the organization something like weather data or stock market data.
- Testing exceptional / error scenarios
- Testing how the application reacts to performance issues from service. (By adding delays to the stub responses)

So the project Mockware born. Mockware provides the following features.

- Reads meta data from Pega integrations and prepopulates details, allows quick creation of mock services.
- Provide toggle buttons to enable and disable mock services for selected connectors
- Displays the request journals to see the request has gone through the mock servers with many level of filters.
- React JS modern frontend supports dark mode for better user experiences.
- Provide quick fill snippets with regular expressions for completing the matching rules when creating mock services.

### The Technical Details

The Mockware application includes two main component. One component is a Pega component application built in Pega 8 and the other part is a optional front end application build on React JS. The mockware application component provides a Pega portal using React JS which can be used as well instead of the external front end application built on React JS. Also Mockware application connects to the Wiremock server for hosting the stub services. Below is a simplified view of the required connectivities between each components for Mockware to work smoothly.

![Deployment Diagram][diagram-deployment]

Mockware front end application uses Pega basic authentication to login. It reads the list of applicable connectors based on authenticated users. It uses Pega DX API service to read the data from Pega. Mockware Pega component installed in Pega provide the needed details from Pega and also does the changes back to Pega as when user making changes through the front end application.

Mockware front end application should have the connectivity to Pega and to the Wiremock service.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][react.js]][react-url]
- <img src="https://www.pega.com/themes/custom/pegawww_theme/images/pega-logo.svg" width="86" title="Pega logo" />
- Pega DX API
- [![TypeScript][typescript]][typescript-url]
- [![SaSS][typescript]][typescript-url]
- [![SaSS][sass]][sass-url]

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

Nish - [@msnisha](https://www.linkedin.com/in/msnisha/)

Project Link: [https://github.com/msnisha/mockware](https://github.com/msnisha/mockware)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Mockware is using Wiremock server

- [Wiremcok server](https://wiremock.org/)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [React Icons](https://iconmonstr.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/msnisha/
[product-screenshot]: images/screenshot.png
[diagram-deployment]: images/deployment-diagram.jpg
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript]: https://img.shields.io/badge/TypeScript-%5E4.7.4-blue
[typescript-url]: https://www.typescriptlang.org/
[sass]: https://img.shields.io/badge/SaSS-1.54.9-purple
[sass-url]: https://sass-lang.com/
[pega-url]: https://pega.com/
