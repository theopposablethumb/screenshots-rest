# screenshots-rest
Node app that uses a rest API to request multiple screenshots from screenshotmachine.com and return them as base64 strings

Uses https://www.screenshotmachine.com/

This app takes an array of URLs as a post request via a REST API. It then requests screenshots of each URL from screenshotmachine.com and converts the image data into base64 strings. 
The base64 strings are then returned as an array for a front end
Screenshots for both desktop and mobile are requested in parallel, as these are two seperate endpoints.

Once the image data is received there's a lot we could do. There's scope to add Item Codes to each URL, and send an array of objects.
Each object could be used to request mobile and desktop images, which could then be joined into an array of objects again using the item code as a key.
There's bound to a be a node package that allows for the creation of PDFs as well.

Since this is image data these operations could be expensive, and payloads are large. An image compression solution may be required.

It's a start :)
