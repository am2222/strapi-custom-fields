# Strapi plugin strapi-custom-fields


A plugin for [Strapi Headless CMS](https://github.com/strapi/strapi) that adds different field renderes to the strapi admin page.

# Still under development





# ColorPicker Field
![Screenshot](https://github.com/am2222/strapi-custom-fields/raw/main/images/colorfield.png?raw=true)
```json
    "color": {
      "type": "text",
      "fieldRenderer": "colorpicker"
    }

```

# Google Places Search Field
Set API key under the settings page

```json
    "address": {
      "type": "text",
      "fieldRenderer": "googlegeocoder"
    }

```
![Screenshot](https://github.com/am2222/strapi-custom-fields/raw/main/images/settings.png?raw=true)
![Screenshot](https://github.com/am2222/strapi-custom-fields/raw/main/images/googleplaces.png?raw=true)

# TODO
Add tests
fix google places api issues
Add more fields.
Support json fields
make it compatible with new custom field api in strapi 4 
Support more field rendere types
Add more options to each field type
