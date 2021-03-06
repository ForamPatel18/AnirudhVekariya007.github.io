(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "externalId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "organisation",
            alias: "organisation",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "owner",
            alias: "owner",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "parent",
            dataType: tableau.dataTypeEnum.bool
        },
        {
            id: "taskName",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "status",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "location",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "trade",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "totalQuantity",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "actualQuantity",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "quantityUnits",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "percentComplete",
            dataType: tableau.dataTypeEnum.float
        },
        {
            id: "baselineStartDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
            id: "baselineEndDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
            id: "plannedStartDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
            id: "actualStartDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
            id: "plannedEndDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
        id: "totalActualWorkers",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "totalPlannedWorkers",
        alias: "totalPlannedWorkers",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "notes",
        alias: "notes",
        dataType: tableau.dataTypeEnum.string
    }
    ,{
        id: "description",
        alias: "description",
        dataType: tableau.dataTypeEnum.string
    },
    {
        id: "taskType",
        alias: "taskType",
        dataType: tableau.dataTypeEnum.string
    },
    {
        id: "baselineDuration",
        alias: "baselineDuration",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "actualDuration",
        alias: "actualDuration",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "plannedDuration",
        alias: "plannedDuration",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "actualEndDate",
        alias: "actualEndDate",
        dataType: tableau.dataTypeEnum.datetime
    },];
    
        var tableSchema = {
            id: "VisiLean",
            alias: "Visilean construction managment data",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {

        $.getJSON("https://go.visilean.com/VisileanAPI/resource/powerBi/getData/E6D7274D-14D3-B4E3-946A-62631A8CA440/6174943a8e6b34d27e9463d306aa6e22/visilean", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "externalId": feat[i].externalId,
                "organisation": feat[i].organisation,
                "owner": feat[i].owner,
                "parent": feat[i].parent,
                "taskName": feat[i].taskName,
                "status": feat[i].status,
                "location": feat[i].location,
                "trade": feat[i].trade,
                "totalQuantity": feat[i].totalQuantity,
                "actualQuantity": feat[i].actualQuantity,
                "quantityUnits": feat[i].quantityUnits,
                "percentComplete": feat[i].percentComplete,
                "baselineStartDate": feat[i].baselineStartDate,
                "baselineEndDate": feat[i].baselineEndDate,
                "plannedStartDate": feat[i].plannedStartDate,
                "actualStartDate": feat[i].actualStartDate,
                "plannedEndDate": feat[i].plannedEndDate,
                "actualEndDate": feat[i].actualEndDate,
                "plannedDuration": feat[i].plannedDuration,
                "actualDuration": feat[i].actualDuration,
                "baselineDuration": feat[i].baselineDuration,
                "taskType": feat[i].taskType,
                "description": feat[i].description,
                "notes": feat[i].notes,
                "totalPlannedWorkers": feat[i].totalPlannedWorkers,
                "totalActualWorkers": feat[i].totalActualWorkers
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
    };

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "VisiLean Details";
            tableau.submit();
        });
    });
})();