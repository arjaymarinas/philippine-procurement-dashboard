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

GET_BIDS_ABC_PER_MONTH = """
WITH bids_clean AS (
    SELECT
        DATE_TRUNC('month', "PublishedDate"::date) AS month_date,
        TO_CHAR("PublishedDate"::date, 'Mon') AS month,
        "BidReferenceNo",
        MAX("ABC") AS ABC
    FROM public."bids"
    WHERE "PublishedDate" IS NOT NULL
    GROUP BY
        DATE_TRUNC('month', "PublishedDate"::date),
        TO_CHAR("PublishedDate"::date, 'Mon'),
        "BidReferenceNo"
)
SELECT
    month AS "Month",
    COUNT(*) AS "Bids Posted",
    SUM(ABC) AS "Total ABC"
FROM bids_clean
GROUP BY month_date, month
ORDER BY month_date;
"""

GET_BIDS_ABC_BY_CLASSIFICATION = """
WITH bids_clean AS (
    SELECT
        "BidReferenceNo",
        "Classification",
        MAX("ABC") AS ABC
    FROM public."bids"
    WHERE "PublishedDate" IS NOT NULL
    GROUP BY "BidReferenceNo", "Classification"
)
SELECT
    "Classification",
    COUNT(*) AS "Bids Posted",
    SUM(ABC) AS "Total ABC"
FROM bids_clean
GROUP BY "Classification"
ORDER BY "Classification" ASC;
"""

GET_TOTAL_AWARD_CA = """
SELECT 
    COUNT(DISTINCT "AwardNo") "Awards Posted",
    SUM("ContractAmount") "Total Contract"
FROM public."bids" 
WHERE "AwardNo" IS NOT NULL AND "PublishedDate" IS NOT NULL 
AND "NoticeStatus" IN ('Awarded', 'Closed', 'Shortlisted');
"""

GET_AWARDS_CA_PER_MONTH = """
SELECT
    TO_CHAR("PublishedDate"::date, 'Mon') AS month,
    COUNT(DISTINCT "AwardNo") AS TotalAward,
	SUM("ContractAmount") AS TotalContractAmount
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