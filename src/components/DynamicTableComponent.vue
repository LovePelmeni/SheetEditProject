<template>

<div class="table" style="display: grid; justify-content: row;">

  <!-- Inserting the Upper Columns -->
  <div class="upperColumns">
    <draggable v-model="UpperColumns" v-for="(Column, index) in UpperColumns" :key="index">
      <upper-column-component :UpperColumn="Column" />
    </draggable>
  </div>

  <!-- Inserting the Side Columns -->

  <div class="sideColumns">
    <draggable v-model="SideColumns" v-for="(Column, index) in SideColumns" :key="index">
      <side-column-component :SideColumn="Column" />
    </draggable>
  </div>

</div>

</template>

<script>

import SideColumnComponent from "./UpperColumnComponent.vue";
import UpperColumnComponent from "./SideColumnComponent.vue";

import draggable from "vuedraggable";
import { mapState } from "vuex";

class CustomizedTableExtensionConverter {
  // Converts the Customized Table from the JSON to the CSV or XLSX
  constructor(self) {
    this.self = self
    this.initializedXlsModulePacket = require("json2xls")
  }
  ConvertToXlsxFileArray(JsonTableStructure) {
    // Converts the JSON-based table structure to the XLSX File, then to byte array
    let XlsFileBinary  = this.initializedXlsModulePacket(JsonTableStructure)
    return XlsFileBinary
  }
  ConvertToCsvFileArray(JsonTableStructureArray) {
    // Converts the JSON-based table structure to the CSV File, then to byte array
    const array = [Object.keys(JsonTableStructureArray[0])].concat(JsonTableStructureArray)
    return array.map(row => {
        return Object.values(row).map(value => {
            return typeof value === 'string' ? JSON.stringify(value) : value
        }).toString()
    }).join('\n')
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

        element.setAttribute('href', `data:${function(){return `text/csv`}()};charset=utf-8,` + encodeURIComponent(FileContent));

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

      element.setAttribute('href', `data:${function(){return `text/xlsx`}()};charset=utf-8,` + encodeURIComponent(FileContent));

      element.setAttribute('download', DownloadFileName);
      element.style.display = 'none';
      document.body.appendChild(element);

    // Immtitating Client, clicking to download the new File
      element.click();
      document.body.removeChild(element);
    }
}

class LocalWindowColumnManager {

  // Manages columns, within the Custom Table on the Window Level, to provide the Ability for Customer 
  // To See the Changes in the Real Time

    constructor(self) {
      this.self = self
    }
    AddNewSideColumnTable(NewSideColumn) {
        // Adds New Side Column to the Custom Table
        this.self.CustomTable.sideColumns.push(NewSideColumn)
    }

    AddNewUpperColumnTable(NewUpperColumn) {
        // Adds New Upper Column to the Custom Table
        this.self.CustomTable.upperColumns.push(NewUpperColumn)
    }

    RemoveUpperColumnTable(UpperColumnName) {
        // Removes the Upper Column Table from the Custom Table 
        this.self.upperColumns = this.self.upperColumns.filter((upperColumn) => {
          return upperColumn.ColumnName.toLowerCase() !== UpperColumnName.toLowerCase()
        })
    }

    RemoveSideColumnTable(SideColumnName) {
        // Removes the Side Column Table from the Custom Table 
        this.self.CustomTable.sideColumns = this.self.sideColumns.filter((sideColumn) => {
          return sideColumn.ColumnName.toLowerCase() !== SideColumnName.toLowerCase()
        })
    }

    ChangeUpperColumnPosition(UpperColumnName, newPositionIndex, previousIndex) {
      // Changing the Position of the Upper Column at the Sheet Table
      try {
        let ColumnToMoveOut = this.self.upperColumns.at(newPositionIndex)
        let ColumnToMoveTo = this.self.upperColumns.filter((Column) => {
        return Column.ColumnName.toLowerCase() === UpperColumnName.toLowerCase()}) 

        this.self.upperColumns.pslice(newPositionIndex, 1, ColumnToMoveTo) // Moving the Dragged column to the New Position at the Array
        this.self.upperColumns.pslice(previousIndex, 1, ColumnToMoveOut) // Moving the Column to the Old Position at the Array
      } catch(e) {
        console.log(e)
      }
    }

    ChangeSideColumnPosition(SideColumnName, newPositionIndex, previousIndex) {
      // Changing the Position of the Side Column at the Sheet Table
      try {
        let ColumnToMoveTo = this.self.sideColumns.filter((Column) => {
        return Column.ColumnName.toLowerCase() === SideColumnName.toLowerCase()})
        let ColumnToMoveOut = this.self.sideColumns.at(newPositionIndex)

        this.self.sideColumns.pslice(newPositionIndex, 1, ColumnToMoveTo)
        this.self.sideColumns.pslice(previousIndex, 1, ColumnToMoveOut)
    
        } catch(e) {
          console.log(e)
        }
    }
}

class ColumnManager {
    // Manages columns, within the Custom Table on the Storage Level.
    // * Is Being used asynchronously in the background

    constructor(self) {
        this.self = self
    }

    OperationTimeout() {
      // Timing out the Column Operation, once executed successfully
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve("operated");
        }, 1000)
      })
      }

    async AddNewSideColumnTable(NewSideColumn) {
        // Adds New Side Column to the Custom Table
        this.self.CustomTable.sideColumns.push(NewSideColumn)
        return this.OperationTimeout()
    }
    async AddNewUpperColumnTable(NewUpperColumn) {
        // Adds New Upper Column to the Custom Table
        this.self.CustomTable.upperColumns.push(NewUpperColumn)
        return this.OperationTimeout()
    }
    async RemoveUpperColumnTable(UpperColumnName) {
        // Removes the Upper Column Table from the Custom Table 
        this.self.CustomTable.upperColumns = this.self.CustomTable.filter((upperColumn) => {
          return upperColumn.ColumnName.toLowerCase() !== UpperColumnName.toLowerCase()
        })
        return this.OperationTimeout()
    }
    async RemoveSideColumnTable(SideColumnName) {
        // Removes the Side Column Table from the Custom Table 
        this.self.CustomTable.sideColumns = this.self.CustomTable.sideColumns.filter((sideColumn) => {
          return sideColumn.ColumnName.toLowerCase() !== SideColumnName.toLowerCase()
        })
        return this.OperationTimeout()
    }
    async ChangeUpperColumnPosition(UpperColumnName, newPositionIndex, previousIndex) {
      // Changing the Position of the Upper Column at the Sheet Table
      try {
        let ColumnToMoveOut = this.self.CustomTable.upperColumns.at(newPositionIndex)
        let ColumnToMoveTo = this.self.CustomTable.upperColumns.filter((Column) => {
        return Column.ColumnName.toLowerCase() === UpperColumnName.toLowerCase()}) 

        this.self.CustomTable.upperColumns.pslice(newPositionIndex, 1, ColumnToMoveTo) // Moving the Dragged column to the New Position at the Array
        this.self.CustomTable.upperColumns.pslice(previousIndex, 1, ColumnToMoveOut) // Moving the Column to the Old Position at the Array
      } catch(e) {
        console.log(e)
      }
      return this.OperationTimeout()
    }
    async ChangeSideColumnPosition(SideColumnName, newPositionIndex, previousIndex) {
      // Changing the Position of the Side Column at the Sheet Table
      try {
        let ColumnToMoveTo = this.self.CustomTable.sideColumns.filter((Column) => {
        return Column.ColumnName.toLowerCase() === SideColumnName.toLowerCase()})
        let ColumnToMoveOut = this.self.CustomTable.sideColumns.at(newPositionIndex)

        this.self.CustomTable.sideColumns.pslice(newPositionIndex, 1, ColumnToMoveTo)
        this.self.CustomTable.sideColumns.pslice(previousIndex, 1, ColumnToMoveOut)
    
      } catch(e) {
          console.log(e)
      }
      return this.OperationTimeout()
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
      draggable,
      SideColumnComponent,
      UpperColumnComponent,
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
            let columnManager = new ColumnManager(this)
            let ColumnName = event.querySelector("input").value;
            let WindowColumnManager = new LocalWindowColumnManager(this)
            WindowColumnManager.RemoveUpperColumnTable(ColumnName)
            columnManager.RemoveUpperColumnTable(ColumnName)
        },

        RemoveSideColumn(event) {
            // Removes the Side Column 
            let SideColumnName = event.querySelector("input").value;
            let columnManager = new ColumnManager(this)
            let WindowColumnManager = new LocalWindowColumnManager(this)
            columnManager.RemoveSideColumnTable(SideColumnName)
            WindowColumnManager.RemoveSideColumnTable(SideColumnName)
        },

        ChangeUpperColumnPosition(event) {
          // Changing the Position of the Upper Column
          let UpperColumnName = event.querySelector("input").value.toLowerCase();
          let newPositionIndex = this.upper_columns[UpperColumnName]["Position"];
          let ColumnManager = new ColumnManager()
          let WindowLocalManager = new LocalWindowColumnManager(this)
          ColumnManager.ChangeUpperColumnPosition(UpperColumnName, newPositionIndex);
          WindowLocalManager.ChangeUpperColumnPosition(UpperColumnName, newPositionIndex)
        },

        ChangeSideColumnPosition(event) {
          // Changing the Position of the Side Column
          let SideColumnName = event.querySelector("input").value.toLowerCase();
          let newPositionIndex = this.upper_columns[SideColumnName]["Position"];
          let ColumnManager = new ColumnManager()
          let WindowLocalManager = new LocalWindowColumnManager(this)
          ColumnManager.ChangeUpperColumnPosition(SideColumnName, newPositionIndex);
          WindowLocalManager.ChangeSideColumnPosition(SideColumnName, newPositionIndex)
        }
    },
    computed: {
        ...mapState(["CustomTable"]),
    },
}

</script>
