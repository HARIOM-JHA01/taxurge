import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="mt-16">
      <div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter">Privacy Policy</h1>
              <p className="text-gray-500 dark:text-gray-400">Last updated: Aug 1, 2024</p>
            </div>
            <div className="prose prose-gray max-w-none">
              <p>
                Welcome to our Terms of Service! These terms and conditions outline the rules and regulations for the
                use of Example Company&apos;s Website, located at http://www.taxurge.com
              </p>
              <h2>Intellectual Property</h2>
              <p>
                Unless otherwise stated, Example Company and/or its licensors own the intellectual property rights for
                all material on example.com. All intellectual property rights are reserved. You may access this from
                example.com for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <h2>Restrictions</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul>
                <li>Publishing any website material in any other media.</li>
                <li>Selling, sublicensing, and/or otherwise commercializing any website material.</li>
                <li>Publicly performing and/or showing any website material.</li>
                <li>Using this website in any way that is or may be damaging to this website.</li>
                <li>Using this website in any way that impacts user access to this website.</li>
                <li>
                  Using this website contrary to applicable laws and regulations, or in any way may cause harm to the
                  website, or to any person or business entity.
                </li>
                <li>
                  Engaging in any data mining, data harvesting, data extracting or any other similar activity in
                  relation to this website.
                </li>
              </ul>
              <p>
                Certain areas of this website are restricted from being access by you and Example Company may further
                restrict access by you to any areas of this website, at any time, in absolute discretion. Any user ID
                and password you may have for this website are confidential and you must maintain confidentiality as
                well.
              </p>
              <h2>Your Privacy</h2>
              <p>
                Please read our Privacy Policy. Your agreement to the terms of this Privacy Policy is hereby
                incorporated into these Terms of Service.
              </p>
              <h2>Links to Other Websites</h2>
              <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled by
                Example Company.
              </p>
              <p>
                Example Company has no control over, and assumes no responsibility for, the content, privacy
                policies, or practices of any third party websites or services. You further acknowledge and agree that
                Example Company shall not be responsible or liable, directly or indirectly, for any damage or loss
                caused or alleged to be caused by or in connection with the use of or reliance on any such content,
                goods, or services available on or through any such websites or services.
              </p>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms, please{" "}
                <Link href="/contact" className="font-medium" prefetch={false}>
                  contact us
                </Link>
                .
              </p>
              <p>
                By accessing this website we assume you accept these terms and conditions in full. Do not continue to
                use this website if you do not accept all of the terms and conditions stated on this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}