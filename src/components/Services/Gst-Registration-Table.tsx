import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Gst_Registration_Table = () => {
  return (
    <div className=" border border-solid p-4 rounded-lg">
      <Table>
        <TableCaption>
          Documents Required for New Registration Application of a Normal
          Taxpayer
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px] font-extrabold text-lg">Purpose</TableHead>
            <TableHead className="w-[300px] font-extrabold text-lg">
              Nature of possession of premises (Own)
            </TableHead>
            <TableHead className="w-[250px] font-extrabold text-lg">
              Nature of possession of premises (Rented/Leased)
            </TableHead>
            <TableHead className="text-right font-extrabold text-lg">Document Type</TableHead>
            <TableHead className="text-right font-extrabold text-lg">Max Size for Upload</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              1. Proof of Constitution of Business (Any One)
            </TableCell>
            <TableCell>
              1. Certificate of Incorporation/Partnership Deed <br /> 2.
              Certificate of Incorporation/Partnership Deed
            </TableCell>
            <TableCell>
              1. Certificate of Incorporation/Partnership Deed <br /> 2.
              Certificate of Incorporation/Partnership Deed
            </TableCell>
            <TableCell className="text-right">JPG, PDF</TableCell>
            <TableCell className="text-right">1.024 MB</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">
              2. Photo of Stakeholder (Promoter / Partner)
            </TableCell>
            <TableCell>Photo of the Promoter/ Partner</TableCell>
            <TableCell>Photo of the Promoter/ Partner</TableCell>
            <TableCell className="text-right">JPG</TableCell>
            <TableCell className="text-right">100 KB</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">
              3. Photo of the Authorised Signatory
            </TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell className="text-right">JPG</TableCell>
            <TableCell className="text-right">100 KB</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">
              4. Proof of Appointment of Authorised Signatory (Any One)
            </TableCell>
            <TableCell>
              1. Letter of Authorisation <br /> 2. Copy of Resolution passed by
              BoD/ Managing Committee and Acceptance letter
            </TableCell>
            <TableCell>
              1. Letter of Authorisation <br /> 2. Copy of Resolution passed by
              BoD/ Managing Committee and Acceptance letter
            </TableCell>
            <TableCell className="text-right">JPG, PDF</TableCell>
            <TableCell className="text-right">100 KB</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">
              5. Proof of Principal Place of business (Any One)
            </TableCell>
            <TableCell>
              1. Electricity Bill <br />
              2. Legal ownership document <br /> 3. Municipal Khata Copy <br />{" "}
              4. Property Tax Receipt
            </TableCell>
            <TableCell>
              1. Electricity Bill <br />
              2. Legal ownership document <br /> 3. Municipal Khata Copy <br />{" "}
              4. Property Tax Receipt <br /> 5. Rent / Lease agreement <br /> 6.
              Rent receipt with NOC (In case of no/expired agreement)
            </TableCell>
            <TableCell className="text-right">JPG, PDF</TableCell>
            <TableCell className="text-right">
              1. 100 KB <br />
              2. 1.024 MB <br /> 3. 100 KB <br /> 4. 100 KB <br /> 5. 2 MB
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Gst_Registration_Table;
