<template>

<div class="table">

  <!-- Inserting the Upper Columns -->
  <div class="upperColumns">
    <draggable v-model="UpperColumns">
      <table-sheet-upper-column-component v-for="(Column, index) in UpperColumns" :key="index" :UpperColumn="Column" />
    </draggable>
  </div>


  <!-- Inserting the Side Columns -->

  <div class="sideColumns">
    <draggable v-model="SideColumns">
      <table-sheet-side-column-component v-for="(Column, index) in SideColumns" :key="index" :SideColumn="Column" />
    </draggable>
  </div>

</div>

</template>

<script>

import draggable from "vuedraggable";
import { mapState } from "vuex";

class CustomizedTableExtensionConverter {
  // Converts the Customized Table from the JSON to the CSV or XLSX
  constructor(self) {
    this.self = self
  }
  ConvertToXlsxFileArray() {
    // Converts the JSON-based table structure to the XLSX File, then to byte array
  }
  ConvertToCsvFileArray() {
    // Converts the JSON-based table structure to the CSV File, then to byte array
  }
}

class DownloadTableManager {
    // Managing the Uploades of the Customized Table

    constructor(self) {
        this.self = self
    }

    DownloadCsvFileTable() {
      // Downloading the Table, that has been customized by the Client in `CSV` Format

        let extensionConverter = new CustomizedTableExtensionConverter(this.self)
        let FileContent = extensionConverter.ConvertToCsvFileArray()

        let DownloadFileName = this.self.FileName
        var element = document.createElement('a');

        element.setAttribute('href', `data:${function(){return `plain/csv`}()};charset=utf-8,` + encodeURIComponent(FileContent));

        element.setAttribute('download', DownloadFileName);
        element.style.display = 'none';
        document.body.appendChild(element);
            
            // Imittating the Clicking and downloading the file 
        element.click();
        document.body.removeChild(element);
    }
    DownloadXlsxFileTable() {
      // Downloading the Table, that has been customized by the CLient in `Xlsx` Format.

      let extensionConverter = new CustomizedTableExtensionConverter(this.self)
      let FileContent = extensionConverter.ConvertToXlsxFileArray()

      let DownloadFileName = this.self.FileName
      var element = document.createElement('a');

      element.setAttribute('href', `data:${function(){return `plain/xlsx`}()};charset=utf-8,` + encodeURIComponent(FileContent));

      element.setAttribute('download', DownloadFileName);
      element.style.display = 'none';
      document.body.appendChild(element);

    // Immtitating Client, clicking to download the new File
      element.click();
      document.body.removeChild(element);
    }
}


class ColumnManager {
    // Manages columns, within the Custom Table 
    constructor(self) {
        this.self = self
    }
    AddNewSideColumnTable(NewSideColumn) {
        // Adds New Side Column to the Custom Table
    }
    AddNewUpperColumnTable(NewUpperColumn) {
        // Adds New Upper Column to the Custom Table
    }
    RemoveUpperColumnTable(UpperColumnName) {
        // Removes the Upper Column Table from the Custom Table 
    }
    RemoveSideColumnTable(SideColumnName) {
        // Removes the Side Column Table from the Custom Table 
    }
    ChangeUpperColumnPosition(UpperColumnName, newPositionIndex) {
      // Changing the Position of the Upper Column at the Sheet Table
    }
    ChangeSideColumnPosition(SideColumnName, newPositionIndex) {
      // Changing the Position of the Side Column at the Sheet Table
    }
}

export default {
    name: "DynamicTableComponent",
    props: ["UploadedFileTable"],
    data() {
        return {
            FileName: null,
            UpperColumns: [], // * has following side component { }
            SideColumns: [], // * has following side component { }
        }
    },
    components: {
      draggable
    },
    mounted() {
      this.InsertUpperColumns()
      this.InsertSideColumns()
    },
    methods: {
        InsertUpperColumns() {
          // Inserting the Initial Values for the Table At the Upper Columns
          this.UpperColumns = this.CustomTable["upperColumns"]
        },
        InsertSideColumns() {
          // Inserting the Initial Values for the Table At the Side Columns
          this.SideColumns = this.CustomTable["sideColumns"]
        },
        DownloadCustomizedTable() {
          // Downloading the Customized Table in `CSV` Format, to the Client Browser
          let downloadManager = new DownloadTableManager(this)
          downloadManager.DownloadCsvFileTable()
        },
        
        DownloadCustomizedXlsxTable() {
          // Downloading the Customized Table in `Xlsx` Format, to the Client Browser
          let downloadManager = new DownloadTableManager(this)
          downloadManager.DownloadXlsxFileTable()
        },

        RemoveUpperColumn(event) {
            // Removes the Upper Column
            let ColumnName = event.querySelector("input").value;
            let columnManager = new ColumnManager(this)
            columnManager.RemoveUpperColumnTable(ColumnName)
        },

        RemoveSideColumn(event) {
            // Removes the Side Column 
            let SideColumnName = event.querySelector("input").value;
            let columnManager = new ColumnManager(this)
            columnManager.RemoveSideColumnTable(SideColumnName)
        },

        ChangeUpperColumnPosition(event) {
          // Changing the Position of the Upper Column
          let columnIdentifier = event.querySelector("input").value.toLowerCase();
          let newPositionIndex = this.upper_columns[columnIdentifier]["Position"];
          let ColumnManager = new ColumnManager()
          ColumnManager.ChangeUpperColumnPosition(columnIdentifier, newPositionIndex);
        },

        ChangeSideColumnPosition(event) {
          // Changing the Position of the Side Column
          let columnIdentifier = event.querySelector("input").value.toLowerCase();
          let newPositionIndex = this.upper_columns[columnIdentifier]["Position"];
          let ColumnManager = new ColumnManager()
          ColumnManager.ChangeUpperColumnPosition(columnIdentifier, newPositionIndex);
        }
    },
    computed: {
        ...mapState(["CustomTable"]),
    },
}

</script>
