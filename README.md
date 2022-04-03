![GitHubBanner](https://user-images.githubusercontent.com/82580473/161424397-6d48798d-18b4-460d-9287-2aebd92b0948.png)
# Welkom op de Blok Tech repository van Team 5

In het groepsonderdeel van Blok Tech werden wij in een team ingedeeld en mochten wij gaan werken aan een volledig functionele matching applicatie waarin al onze eerder gemaakte features samenkomen. Door middel van een brainstormsessie en het bekijken van elkaars werk zijn we tot een plan gekomen, en hebben we een concreet concept gekozen om te gaan uitwerken.

## Concept
Ons concept is een matching app voor mensen met huisdieren, waarin je een profiel kan aanmaken op basis van je huisdier en met elkaar kan matchen. Ontdek potentiële matches via de 'Discovery' pagina, met gebruik van filters, en like deze profielen om ze vervolgens terug te kunnen vinden op de 'Likes' pagina. Door middel van gedeelde profielen kan je gemakkelijk switchen tussen het huisdier en het menselijke profiel, en zo vind je misschien wel de liefde van je leven, mét een leuke dierenvriend. 

## Install and Run Application
Ten eerste heeft u de volgende programma's nodig om de applciatie te installeren en te runnen:
- NPM
- Node

Onze applicatie maakt ook gebruik van een Database:
- MongoDB

Verder maakt het project gebruik van de volgende dependencies:\
`"array-back": "^6.2.2"`
    `"arrayify": "^1.0.0"`
    `"body-parser": "^1.19.2"`
    `"camelcase": "^6.3.0"`
    `"date-fns": "^2.28.0"`
    `"dotenv": "^16.0.0"`
    `"ejs": "^3.1.6"`
    `"express": "^4.17.3"`
    `"mongodb": "^4.4.1"`
    `"multer": "^1.4.4"`
    `"nodemailer": "^6.7.3"`
    `"server": "^1.0.37"`
    `"slug": "^5.2.0"`

Om onze applicatie op uw eigen apparaat te installeren en uit te voeren moeten er een aantal simpele stappen ondernomen worden. Ten eerste moet de repository gecloned worden, vul de volgende regel in in de GIT Bash.
```
$ git clone https://github.com/MarijnMolenaar/team-5-repo/
```
Vervolgens installeert u de nodige pakketten via de terminal.
```
npm install
```
Hierna kan de applicatie lokaal uitgevoerd worden door de volgende regel in de terminal in te voeren.
```
node app.js
```
U krijgt een alert dat de app gehost wordt binnen uw lokale systeem, in dit geval op portnummer 4000. Dit nummer kunt u ten alle tijde wijzigen door de `const port = 4000;` te wijzigen bovenin het app.js bestand.

Om gebruik te maken van de MongoDB database heeft u een eigen .env file nodig waarin u uw eigen gegevens invult. Om te kijken hoe dit moet kunt u de code binnen [VOORBEELDenv](https://github.com/MarijnMolenaar/team-5-repo/blob/main/VOORBEELDenv) kopiëren en personaliseren binnen uw eigen file.

De structuur van een document binnen mijn database ziet er als volgende uit:
```
  {
        "url": "",
        "name": "",
        "age": "",
        "country": "",
        "bio": "",
        "interests": ["", ""],
        "url_a": "",
        "name_a": "",
        "age_a": "",
        "type_a": "",
        "breed_a": "",
        "bio_a": ""
  }
```
U dient twee verschillende database collections te maken, één bestemd voor het gebruikers profiel, en één bestemd voor de potentiële matches, beide documentstructuren zijn hetzelfde.

## Contributers  
* Tessa Willing 
* Marijn Molenaar 
* Josst Verweijen 
* Whitney Abrah 

## License
Wij hebben gebruik gemaakt van de [MIT License](https://github.com/Joosiii/BlokTech/blob/master/LICENSE).

----------------------
Lees voor meer informatie verder in de [Wiki](https://github.com/Joosiii/BlokTech/wiki)!




