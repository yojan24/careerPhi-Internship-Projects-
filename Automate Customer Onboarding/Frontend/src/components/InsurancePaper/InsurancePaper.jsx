import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

function InsurancePaper({
  InsuranceType = "Car Insurance",
  policyNo,
  carNumber,
  insurerName,
  carVariant,
  fuel,
  registrationDate,
  planType,
  idv,
  city,
  ownerName,
  gender,
  phone,
  age,
  engineNumber,
  chassisNumber,
  expire,
  payment,
}) {
  const paper = useRef(null);
  const handleDownload = async () => {
    const element = paper.current;
    // console.log(element);

    if (element) {
      html2pdf()
        .from(element) // Capture the content from the receiptRef
        .set({
          margin: 10,
          filename: "paper.pdf",
          image: { type: "jpeg", quality: 1 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          const pdfUrl = pdf.output("bloburl");

          const newTab = window.open(pdfUrl, "_blank");
          if (!newTab) {
            alert("Please allow popups for this site.");
          }
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          alert("There was an error generating the PDF. Please try again.");
        });
    }
  };

  return (
    <>
      <div
        style={{
          width: "0", // Keep width and height set to full or auto so it captures the layout correctly
          height: "auto", // Allow the height to expand based on the content
          visibility: "hidden", // Make sure it is hidden but still in the DOM for html2pdf to capture
          position: "absolute", // Keep it out of the visible flow of the page
          overflow: "hidden", // Prevent overflow issues
        }}
      >
        <div
          ref={paper}
          style={{
            width: "100%",
            padding: "20px",
            background: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <h1 className="w-full text-center text-3xl font-semibold text-purple-600 py-2 ">
            INSURANCE
          </h1>
          <h2 className="w-full text-center text-3xl font-semibold py-1 ">
            {InsuranceType}
          </h2>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="border-2 border-gray-300 rounded-md p-4">
              {ownerName && (
                <div className="flex gap-5">
                  <strong className="w-32">Insurer Name:</strong>
                  <p>{ownerName}</p>
                </div>
              )}
              {phone && (
                <div className="flex gap-5">
                  <strong className="w-32">Contact:</strong>
                  <p>{phone}</p>
                </div>
              )}
              {age && (
                <div className="flex gap-5">
                  <strong className="w-32">Age:</strong>
                  <p>{age}</p>
                </div>
              )}
              {gender && (
                <div className="flex gap-5">
                  <strong className="w-32">Gender:</strong>
                  <p>{gender}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col border-2 border-gray-300 rounded-md p-4">
              {policyNo && (
                <div className="flex gap-5">
                  <strong className="w-32">Policy No:</strong>
                  <p>{policyNo}</p>
                </div>
              )}
              {registrationDate && expire && (
                <div className="flex gap-5">
                  <strong className="w-32">From:</strong>
                  <p>{registrationDate}</p>
                  <strong className="w-32">To:</strong>
                  <p>{expire}</p>
                </div>
              )}
              {idv && (
                <div className="flex gap-5">
                  <strong className="w-32">IDV:</strong>
                  <p>{idv}</p>
                </div>
              )}
              {payment && (
                <div className="flex gap-5">
                  <strong className="w-32">Premium:</strong>
                  <p>{payment}</p>
                </div>
              )}
              {planType && (
                <div className="flex gap-5">
                  <strong className="w-32">Years Of Plan:</strong>
                  <p>{planType}</p>
                </div>
              )}
            </div>
          </div>

          {InsuranceType === "Car Insurance" && (
            <div className="border-2 border-gray-300 mt-2 p-1 rounded-md">
              <table className="min-w-full rounded-lg">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium border-2 text-center">
                      Car Number
                    </th>
                    <th className="px-6 py-3 text-sm font-medium border-2 text-center">
                      Variant
                    </th>
                    <th className="px-6 py-3 text-sm font-medium border-2 text-center">
                      Chassis Number
                    </th>
                    <th className="px-6 py-3 text-sm font-medium border-2 text-center">
                      Engine Number
                    </th>
                    <th className="px-6 py-3 text-sm font-medium border-2 text-center">
                      Fuel
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="hover:bg-gray-100">
                    <td className="px-6 py-3 text-sm border-2 text-center">
                      {carNumber}
                    </td>
                    <td className="px-6 py-3 text-sm border-2 text-center">
                      {carVariant}
                    </td>
                    <td className="px-6 py-3 text-sm border-2 text-center">
                      {chassisNumber}
                    </td>
                    <td className="px-6 py-3 text-sm border-2 text-center">
                      {engineNumber}
                    </td>
                    <td className="px-6 py-3 text-sm border-2 text-center">
                      {fuel}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {InsuranceType === "Health Insurance" && (
            <div>
              <table class="min-w-full rounded-lg border-collapse border-2">
                <thead class="">
                  <tr>
                    <th class="px-6 py-3 text-sm font-medium border-2 text-center">
                      Insured Person
                    </th>
                    <th class="px-6 py-3 text-sm font-medium border-2 text-center">
                      City
                    </th>
                    <th class="px-6 py-3 text-sm font-medium border-2 text-center">
                      Age
                    </th>

                    <th class="px-6 py-3 text-sm font-medium border-2 text-center">
                      Expiry Date
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  <tr class="hover:bg-gray-100">
                    <td class="px-6 py-3 text-sm border-2 text-center">
                      {insurerName}
                    </td>
                    <td class="px-6 py-3 text-sm border-2 text-center">
                      {city}
                    </td>
                    <td class="px-6 py-3 text-sm border-2 text-center">
                      {age}
                    </td>
                    <td class="px-6 py-3 text-sm border-2 text-center">
                      {expire}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {InsuranceType === "Car Insurance" && (
            <div className="mt-2 text-[0.93rem]">
              <p classname="py-2">
                <strong>Limits of Liability:</strong>
                (i) Under Section II - 1 (i) of the policy - Death of or bodily
                injury: Such an amount as is necessary to meet the requirements
                of the Motor Vehicles Act, 1988. (ii) Under Section II - 1 (ii)
                of the policy - Damage to Third Party Property Rs 100,000. PA
                Cover for Owner-Driver under section III - CSI Rs 100,000
                (Voluntary).
              </p>
              <p classname="py-2">
                <strong>Important Notice:</strong> The insurer is not liable if
                the vehicle is used for purposes other than as described in the
                policy, such as commercial use, organized racing, or speed
                testing. The insurance is also void if the driver is under the
                influence of intoxicating substances or does not hold a valid
                driving license.
              </p>
              <p classname="py-2">
                <strong>Premium Details:</strong> The premium is inclusive of
                taxes and is valid for the insured period. Renewal of the policy
                must be done before the expiry date to avoid penalties.
              </p>
              <p classname="py-2">
                <strong>Policy Validity:</strong> This policy is valid subject
                to the realization of premium payment. The insurer reserves the
                right to terminate the policy if false information is provided.
              </p>
              <p classname="py-2">
                <strong>Claim Process:</strong> In the event of an accident or
                loss, claims must be reported immediately through the insurer's
                toll-free number. Required documents, such as the policy
                certificate, driving license, FIR (if applicable), and vehicle
                repair bills, should be submitted promptly.
              </p>
              <p classname="py-2">
                <strong>Exclusions:</strong>
                This policy does not cover: - General wear and tear or
                depreciation of the vehicle. - Mechanical or electrical
                breakdown. - Loss or damage caused due to nuclear risks, war, or
                terrorism. - Damage incurred outside the geographical area of
                India.
              </p>
              <p classname="py-2">
                <strong>No-Claim Bonus (NCB):</strong>
                If no claims are made during the policy period, the insured is
                eligible for a discount on the premium at renewal. The NCB
                percentage increases with consecutive claim-free years.
              </p>
              <p classname="py-2">
                <strong>Grievance Redressal:</strong>
                If the insured has any complaints or grievances, they may
                contact the insurer’s customer service department. Escalation to
                the Insurance Ombudsman is possible if issues remain unresolved.
              </p>
              <p classname="py-2">
                <strong>Cancellation Policy:</strong>
                The policy may be canceled at any time by the insured or
                insurer. Refunds will be processed on a pro-rata basis, subject
                to terms and conditions.
              </p>
              <p classname="py-2">
                <strong>Deductibles:</strong>A compulsory deductible of Rs. 500
                will be applicable for each claim. Additional voluntary
                deductibles may be chosen to reduce the premium.
              </p>
            </div>
          )}
          {InsuranceType === "Health Insurance" && (
            <div className="mt-2 text-[0.93rem]">
              <p>
                <strong>Scope of Coverage:</strong>
                This health insurance policy covers hospitalization expenses,
                pre-hospitalization (up to 30 days), post-hospitalization (up to
                60 days), and day-care procedures. It also includes emergency
                ambulance charges and domiciliary hospitalization, as per the
                policy terms.
              </p>
              <p>
                <strong>Limits of Liability:</strong>
                The sum insured limit is Rs. 5,00,000 per policy year.
                Sub-limits may apply to specific procedures such as cataract
                surgery, room rent, ICU charges, and doctor consultations.
              </p>
              <p>
                <strong>Important Notice:</strong>
                Claims for pre-existing diseases are covered only after the
                waiting period of 2 years (or as specified in the policy).
                Ensure timely premium payment to keep the policy active and
                avoid coverage lapses.
              </p>
              <p>
                <strong>Claim Process:</strong>- In case of planned
                hospitalization, notify the insurer 48 hours in advance. - For
                emergency hospitalization, intimate the insurer within 24 hours
                of admission. - Provide documents like the hospital bill,
                discharge summary, diagnostic reports, and prescriptions for
                claim settlement. - Cashless treatment is available at network
                hospitals; for non-network hospitals, reimbursement claims can
                be filed.
              </p>

              <p>
                <strong>Pre-and Post-Hospitalization Coverage:</strong>
                Pre-hospitalization expenses up to 30 days and
                post-hospitalization expenses up to 60 days are covered,
                provided they are related to the illness for which
                hospitalization was required.
              </p>
              <p>
                <strong>No-Claim Bonus (NCB):</strong>A cumulative bonus of
                5-10% on the sum insured is offered for every claim-free year,
                up to a maximum of 50%.
              </p>
              <p>
                <strong>Grievance Redressal:</strong>
                Policyholders can reach out to the customer service team for any
                grievances. For unresolved issues, the insured can escalate the
                matter to the Insurance Ombudsman or IRDAI.
              </p>
              <p>
                <strong>Co-Payment Clause:</strong>
                The policyholder is required to bear 10-20% of the claim amount
                for specific claims, as outlined in the policy terms.
              </p>
              <p>
                <strong>Waiting Period:</strong>- 30 days for general illnesses
                (excluding accidents). - 2-4 years for pre-existing diseases,
                depending on the policy. - Specified treatments like joint
                replacements and hernia are covered after a 2-year waiting
                period.
              </p>
              <p>
                <strong>Free Look Period:</strong>A free look period of 15 days
                is available from the date of policy issuance to review the
                terms and conditions. If not satisfied, the policyholder may
                cancel the policy during this period for a refund.
              </p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="p-2 bg-purple-600 mt-3 text-white rounded-md hover:bg-purple-500 hover:text-black active:bg-purple-400"
      >
        Download Paper
      </button>
    </>
  );
}

export default InsurancePaper;
