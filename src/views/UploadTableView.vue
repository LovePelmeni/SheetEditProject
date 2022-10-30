<template>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@100;400;900&display=swap" rel="stylesheet" />

    <!-- <script src="https://cdn.jsdelivr.net/npm/kute.js@2.1.2/dist/kute.min.js"></script> -->
  </head>
  <body>

    <section class="dark">
      <h1>AdjustLet</h1>
      <p>Your Golden Opportunity to be great and powerful with managing XLSX / CSV Files</p>
    </section>

    <section class="red">
      <h1>Who we are?</h1>
      <p>Our Company provides ability to manage your CSV / XLSX / Excel Files</p>

      <div class="wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </section>

    <div class="buttonConsultationContainer" style="justify-content: space-between; display: flex;">
    <button class="btn btn-get-started" style="position: absolute; right: 30%; height: 50px; width: 200px;"><label>Get Bills Info</label></button>
    <button class="btn btn-get-started" style="position: absolute; left: 30%; height: 50px; width: 200px;"><label>Free Consultation</label></button>
    </div>

    <div class="spacer layer1"></div>

    <section>
      <h1>Nice Curves!</h1>
      <p>A website is like a road. The more curves it has the more interesting it is.</p>
    </section>

    <div class="spacer layer2 flip"></div>

    <section class="pink">
      <div class="blob-content">
        <h1>Nice Curves!</h1>
        <p>A website is like a road. The more curves it has the more interesting it is.</p>
      </div>

      <svg
        class="blob-motion"
        id="visual"
        viewBox="0 0 960 540"
        width="960"
        height="540"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <g transform="translate(450.7256843113689 283.4942824330989)">
          <path
            id="blob1"
            d="M148.7 -134.9C193.7 -103.7 231.9 -51.9 232.4 0.6C233 53 196.1 106.1 151.1 128.6C106.1 151.1 53 143 -4.4 147.4C-61.8 151.8 -123.5 168.5 -151.2 146C-178.8 123.5 -172.4 61.8 -172.8 -0.4C-173.1 -62.5 -180.3 -124.9 -152.6 -156.1C-124.9 -187.3 -62.5 -187.1 -5.3 -181.8C51.9 -176.5 103.7 -166 148.7 -134.9"
            fill="#BB004B"
          ></path>
        </g>
        <g transform="translate(509.54377535978017 281.49390864595887)" style="visibility: hidden">
          <path
            id="blob2"
            d="M115.4 -137.9C137.9 -92.9 136.4 -46.4 133.6 -2.8C130.8 40.8 126.6 81.6 104.1 118.4C81.6 155.2 40.8 188.1 -8.4 196.5C-57.5 204.8 -115 188.7 -151 151.9C-187 115 -201.5 57.5 -190.8 10.7C-180.1 -36.1 -144.1 -72.1 -108.1 -117.1C-72.1 -162.1 -36.1 -216.1 5.2 -221.2C46.4 -226.4 92.9 -182.9 115.4 -137.9"
            fill="#BB004B"
          ></path>
        </g>
      </svg>
    </section>
  </body>
</html>

</template>

<script>


import { mapMutations } from "vuex";


class UploadTableConverter {
    // Converts the Customer's Uploaded File to the JSON-schema
    constructor(self) {
        this.self = self
    }
    ConvertXlsxToJson() {
        // Converts the Xlsx File Table to the JSON-data-structure
    }
    ConvertCsvToJson() {
        // Converts the CSV File Table to the JSON-data-structure
    }
}
class UploadTableManager {
    // Uploading the Converted to the JSON Table to the Temporary Store
    constructor(self) {
        this.self = self
    }
    UploadFile(File) {
        // Uploades to the Store
        this.self.UPLOAD_TABLE(File)
    }
}

export default {
    name: "UploadTableView", 
    methods: {
        ...mapMutations(["UPLOAD_TABLE"]),

        UploadCsvFileToStore() {
            // Uploading the CSV Table to the Temporary Store
            let ConverterManager = new UploadTableConverter()
            let Uploader = new UploadTableManager()
            let ConvertedJSONSchema = ConverterManager.ConvertCsvToJson()
            Uploader.UploadFile(ConvertedJSONSchema)
            this.RedirectToTheDynamicTablePage()
        },
        UploadXlsxFileToStore() {
            // Uploading the Xlsx Table to the Temporary Store 
            let ConverterManager = new UploadTableConverter()
            let Uploader = new UploadTableManager()
            let ConvertedJSONSchema = ConverterManager.ConvertXlsxToJson()
            Uploader.UploadFile(ConvertedJSONSchema)
            this.RedirectToTheDynamicTablePage()
        },

        RedirectToTheDynamicTablePage() {
            // Redirects to the Dynamic Table Page 
            this.$router.push({name: "edit_table_page"})
        }
    },
}
</script>

<style>


.label {
    color: #fff !important;
    font-size: 4rem;
}

.btn {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 16px 24px;
  border: none;
  border-radius: 24px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  
}

.btn-get-started {
  background-color: purple;
  margin: auto !important;
}

.DownloadCustomTableButtonBlock {
    justify-content: center;
    display: flex;
}


      h1 {
        font-size: 4rem;
      }
      p {
        font-size: 1.5rem;
      }
      body {
        margin: 0;
        font-family: 'Prompt', sans-serif;
        color: white;
        background: #202731;
        overflow-x: hidden;
      }

      section {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 400px;
        padding-top: 100px;
      }

      .blue {
        background: #3c31dd;
      }

      .red {
        background: #dd3f31;
      }

      .pink {
        background: #ff0066;
        overflow: hidden;
      }

      .dark {
        background: #0f0f10;
      }

      /* Curved bg with plain CSS */

      .curve {
        position: absolute;
        height: 250px;
        width: 100%;
        bottom: 0;
        text-align: center;
      }

      .curve::before {
        content: '';
        display: block;
        position: absolute;
        border-radius: 100% 50%;
        width: 55%;
        height: 100%;
        transform: translate(85%, 60%);
        background-color: hsl(216, 21%, 16%);
      }

      .curve::after {
        content: '';
        display: block;
        position: absolute;
        border-radius: 100% 50%;
        width: 55%;
        height: 100%;
        background-color: #3c31dd;
        transform: translate(-4%, 40%);
        z-index: -1;
      }

      /* Bubble bg with plain CSS */

      .bubble::after {
        content: '';
        border-top-left-radius: 50% 100%;
        border-top-right-radius: 50% 100%;
        position: absolute;
        bottom: 0;
        z-index: -1;
        width: 100%;
        background-color: #0f0f10;
        height: 85%;
      }

      /* Curved bg with SVG via https://www.shapedivider.app/ */

      .wave {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        line-height: 0;
      }

      .wave svg {
        position: relative;
        display: block;
        width: calc(103% + 1.3px);
        height: 262px;
      }

      .wave .shape-fill {
        fill: hsl(240, 3%, 6%);
      }

      /* SVG background image via https://haikei.app/ */

      .spacer {
        aspect-ratio: 960/300;
        width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }

      .layer1 {
        background-image: url('@/assets/color_layer.svg');
      }
      
      .layer2 {
        background-image: url('@/assets/color_layer_2.svg');
      }

      .flip {
        transform: rotate(180deg);
      }

      /* Blobs SVG background image via https://haikei.app/ */

      .blob-motion {
        position: absolute;
        transform: translateY(-20%);
        z-index: 0;
      }

      .blob-content {
        z-index: 1;
      }

</style>