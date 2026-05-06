#GET_SUPPLIERS_QUERY = """
#SELECT "MerchantID", "Name", "OrgType", "FormOfOrg", "BusinessCategory", "IsForeign", "Country", "Region", "Province", "City", "Address", "Postal"
#FROM public.suppliers
#ORDER BY "Name" ASC;    
#"""

GET_SUPPLIERS_QUERY = """
SELECT *
FROM public."Merchants"
ORDER BY "Name" ASC;    
"""