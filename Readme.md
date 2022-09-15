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

- [![Pega][pega]][pega-url]
- [![React][react.js]][react-url]
- [![Pega DX API][pega-dx-api]][pega-url]
- [![TypeScript][typescript]][typescript-url]
- [![SaSS][sass]][sass-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Mockware contains a docker image and a Pega component application. You can download the docker image from
[https://hub.docker.com/r/msnisha/mockware](https://hub.docker.com/r/msnisha/mockware) and the product export
for the Pega component application is available in this repository inside pega directory.

### Prerequisites

You need to have envirornment with docker CLI installed for running docker containers for Mockware front end and wiremock server.
Also Pega envirornment should be able to reach the Wiremock server for serving the data from Stub.

### Installation

Here is the step by step installation instructions.

1. Download the Pega Product file from /src/pega/rap-v1.rar file and import in any Pega 8.x application
2. Add the Mockware component as one of the built on component for your pega application.
3. Setup a wiremock server if you don't have one. (Refer <a href="https://wiremock.org/docs/getting-started/">Wiremock Getting starter</a> for detail instruction). Wiremock can be installed as docker container or as a standalone server.
4. Configure the Wiremock server endpoint in Pega. Change the dynamic system setting "" for this.
5. Add the Pega portal to your access group and launch the portal
6. Your are ready to Rock :smile:
7. Optionally you can use the mockware front end application as standalone application. You can follow the steps given in docker hub to setup the Mockware front end as stand alone application. Refer [https://hub.docker.com/r/msnisha/mockware](https://hub.docker.com/r/msnisha/mockware)

## Usage

Setting up mockware will only take couple of minutes if you are familiar with docker based deployment. Once setup it will save more time to the Pega development, testing teams and as well as for users to go through the different scenario by toggling the response.

Wiremock match the request agaist define stubs based on different criteria. It allows us to create multiple conditional responses. Also mapping priority can be changed within Mockware for testing output scenarios for same input.

Also there is a delay feature can be configured for stubs in mockware response. This will allow us to test how well we handled performance delays in Pega application. Some time the integration will response faster when the volume is low and can get slower in production with high volume. Testing with slower integration response time, will give us the feeling on how the application handle the delays such as using loading icon, and showing some informative messages.

Stub services can be help is many ways in many project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Intial Release of the component
- [x] Supports dark mode
- [x] Delayed response options for the stubs to test how app handles the delayed responses
- [ ] Implement scope supporting for the mock services (Enable simulation only for selected users, access groups or at globally)
- [ ] Complete the Recording feature to create stubs using actual integration response
- [ ] Supporting other Connector Types (Connect-SOAP)

See the [open issues](https://github.com/msnisha/mockware/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Links

Developer - [@Nish](https://www.linkedin.com/in/msnisha/)

Code Repository Link: [https://github.com/msnisha/mockware](https://github.com/msnisha/mockware)

Docker Image Link: [https://hub.docker.com/r/msnisha/mockware](https://hub.docker.com/r/msnisha/mockware)

Hackathon Page Link: [https://devpost.com/software/mockware](https://devpost.com/software/mockware)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

The following open source projects / assets / references have been used as part of the Mockware component development.

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
[pega]: https://img.shields.io/badge/Pega-8.7-00ccff
[pega-dx-api]: https://img.shields.io/badge/PegaDX-00ccff
