#GET_SUPPLIERS_QUERY = """
#SELECT "MerchantID", "Name", "OrgType", "FormOfOrg", "BusinessCategory", "IsForeign", "Country", "Region", "Province", "City", "Address", "Postal"
#FROM public.suppliers
#ORDER BY "Name" ASC;    
#"""

GET_TOTAL_BIDS_ABC = """
WITH bids_clean AS (
    SELECT
        "BidReferenceNo",
        MAX("ABC") AS ABC
    FROM public."bids"
    WHERE "PublishedDate" IS NOT NULL
    GROUP BY "BidReferenceNo"
)
SELECT
    COUNT(*) AS "Bids Posted",
    SUM(ABC) AS "Total ABC"
FROM bids_clean; 
"""

GET_BIDS_PER_MONTH = """
SELECT
    TO_CHAR("PublishedDate"::date, 'Mon') AS month,
    COUNT(DISTINCT "BidReferenceNo") AS total
FROM bids
WHERE "PublishedDate" IS NOT NULL
GROUP BY DATE_TRUNC('month', "PublishedDate"::date),
         TO_CHAR("PublishedDate"::date, 'Mon')
ORDER BY DATE_TRUNC('month', "PublishedDate"::date);
"""

GET_TOTAL_AWARD_CA = """
SELECT 
    COUNT(DISTINCT "AwardNo") "Awards Posted",
    SUM("ContractAmount") "Total Contract"
FROM public."bids" 
WHERE "AwardNo" IS NOT NULL AND "PublishedDate" IS NOT NULL 
AND "NoticeStatus" IN ('Awarded', 'Closed', 'Shortlisted');
"""

GET_AWARDS_PER_MONTH = """
SELECT
    TO_CHAR("PublishedDate"::date, 'Mon') AS month,
    COUNT(DISTINCT "AwardNo") AS total
FROM bids
WHERE "AwardNo" IS NOT NULL AND "PublishedDate" IS NOT NULL 
AND "NoticeStatus" IN ('Awarded', 'Closed', 'Shortlisted')
GROUP BY DATE_TRUNC('month', "PublishedDate"::date),
         TO_CHAR("PublishedDate"::date, 'Mon')
ORDER BY DATE_TRUNC('month', "PublishedDate"::date);
"""

GET_TOTAL_ACTIVE_MERCHANT = """
SELECT COUNT(*) AS total_merchants
FROM merchants;
"""

GET_TOTAL_PLATINUM_MERCHANT = """
SELECT COUNT(*) AS platinum_merchants
FROM merchants
WHERE "Membership Type" = 'Platinum';
"""