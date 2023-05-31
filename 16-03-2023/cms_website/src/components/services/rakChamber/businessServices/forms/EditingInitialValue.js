export const editingInitialValues = (type, data) => {
  switch (type) {
    case "editCoo":
      return {
        cooCode: data && data[0] ? data[0].coo_code : "",
        serviceType: "",
        fees: "",
        updated_disten1: data && data[0] ? data[0].destination1 : "",
        updated_disten2: data && data[0] ? data[0].destination2 : "",
        updated_disten3: data && data[0] ? data[0].destination3 : "",
        updated_disten4: data && data[0] ? data[0].destination4 : "",
        updated_transportaion_code:
          data && data[0] ? data[0]?.transportation_code : "",
        updated_exp_country_code: {
          code: data && data[0] ? data[0]?.exp_country_code : "",
          code_name: data && data[0] ? data[0]?.exp_country_name : "",
          code_name_e: data && data[0] ? data[0]?.exp_country_name_e : "",
        },
        copy_number: 0,
        seal_number: 0,
        updateline1: "",
        updateline2: "",
        updateline3: "",
        updateline4: "",
        updateline5: "",
        updateline6: "",
        updateline7: "",
        updateline8: "",
        updateline9: "",
        uom: {},
        coo_details: {},
      };
    case "editRatification":
      return {
        ratificationCode: data ? Number(data?.ratification_type) : "",
        ratificationDocCode: data ? Number(data?.document_code) : "",
        ratificationDocName: data ? data?.description : "",
        lang: data ? Number(data?.selected_language) : "",
        person_name: data
          ? data?.person_name == null
            ? ""
            : data?.person_name
          : "",
        notes: data ? data?.user_note : "",
        checkUndertraking: [],
      };
    case "editAdditional":
      return {
        cooCode: data ? Number(data?.coo_code) : "",
        serviceType: data ? Number(data?.income_code) : "",
        count: data ? Number(data?.srv_count) : "",
        fees: data ? Number(data?.fees) : "",
        notes: data ? data?.user_note : "",
      };
    case "editNewCoo":
      return {
        cooType: data ? Number(data.coo[0]?.coo_type) : "",
        membershipCode: "",
        companyName: "",
        invoiceDate: data ? data.coo[0].invoice_issue_date : "",
        invoiceNumber: data ? data.coo[0]?.invoice_no : "",
        invoiceValue: data ? Number(data.coo[0]?.invoice_value) : "",
        currency: {
          code: data ? Number(data.coo[0]?.currency_code) : "",
          name: data ? data.coo[0]?.invoice_currency_name : "",
          name_e: data ? data.coo[0]?.invoice_currency_name_e : "",
        },
        certificateFees: "",
        countryOfConsignee: {
          code: data && data.coo[0] ? data.coo[0]?.consignee_country_code : "",
          code_name:
            data && data.coo[0] ? data.coo[0]?.consignee_country_name : "",
          code_name_e:
            data && data.coo[0] ? data.coo[0]?.consignee_country_name_e : "",
        },
        countryOfOrigin: data ? data.origin_countries : "",
        departureDate: "",
        portDischarge: data ? data.coo[0]?.port_of_discharge : "",
        transportation: data ? Number(data.coo[0]?.transportation_code) : "",
        dest1: data ? data.coo[0]?.destination1 : "",
        dest2: data ? data.coo[0]?.destination2 : "",
        dest3: data ? data.coo[0]?.destination3 : "",
        dest4: data ? data.coo[0]?.destination4 : "",
        numOfCopies: data
          ? data.addional_copy[0]
            ? Number(data.addional_copy[0]?.srv_count)
            : ""
          : "",
        numOfCopiesFees: "",
        numOfSeals: data
          ? data.addional_stamp[0]
            ? Number(data.addional_stamp[0]?.srv_count)
            : ""
          : "",
        numOfSealsFees: "",
        notes: "",
        line1: data ? data.coo[0]?.line1 : "",
        line2: data ? data.coo[0]?.line2 : "",
        line3: data ? data.coo[0]?.line3 : "",
        line4: data ? data.coo[0]?.line4 : "",
        line5: data ? data.coo[0]?.line5 : "",
        line6: data ? data.coo[0]?.line6 : "",
        line7: data ? data.coo[0]?.line7 : "",
        line8: data ? data.coo[0]?.line8 : "",
        line9: data ? data.coo[0]?.line9 : "As per attached Invoice",
        uom: {},
        coo_details: {},
        user_remark: data ? data.coo[0].user_remark : "",
      };
    case "editEditedCoo":
      return {
        cooCode: data && data?.items?.length ? data.items[0]?.coo_code : "",

        updated_disten1:
          data && data?.items?.length ? data?.items[0]?.destination1 : "",
        updated_disten2:
          data && data?.items?.length ? data?.items[0]?.destination2 : "",
        updated_disten3:
          data && data?.items?.length ? data?.items[0]?.destination3 : "",
        updated_disten4:
          data && data?.items?.length ? data?.items[0]?.destination4 : "",
        updated_transportaion_code:
          data && data?.items?.length
            ? data?.items[0]?.transportation_code
            : "",
        updated_exp_country_code:
          data && data?.items?.length
            ? data?.items[0]?.updated_exp_country_code
            : "",
        copy_number:
          data && data?.copyNum?.length
            ? Number(data?.copyNum[0]?.srv_count)
            : "",
        seal_number:
          data && data?.sealNum?.length
            ? Number(data?.sealNum[0]?.srv_count)
            : "",
        updateline1:
          data && data?.items?.length ? data?.items[0]?.updateline1 : "",
        updateline2:
          data && data?.items?.length ? data?.items[0]?.updateline2 : "",
        updateline3:
          data && data?.items?.length ? data?.items[0]?.updateline3 : "",
        updateline4:
          data && data?.items?.length ? data?.items[0]?.updateline4 : "",
        updateline5:
          data && data?.items?.length ? data?.items[0]?.updateline5 : "",
        updateline6:
          data && data?.items?.length ? data?.items[0]?.updateline6 : "",
        updateline7:
          data && data?.items?.length ? data?.items[0]?.updateline7 : "",
        updateline8:
          data && data?.items?.length ? data?.items[0]?.updateline8 : "",
        updateline9:
          data && data?.items?.length ? data?.items[0]?.updateline9 : "",

        serial_no: "",
        item_code: "",
        hs_code: "",
        hs_level2_name: "",
        hs_level2_name_e: "",
        uom: "",
        qty: "",
        weight: "",
        unit_price: "",
        total_price: "",
        unit_of_measure_name: "",
        unit_of_measure_name_e: "",
        emp_note: data && data?.items?.length ? data?.items[0]?.emp_note : "",
      };
    default:
      break;
  }
};
