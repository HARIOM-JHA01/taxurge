"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Document {
  _id: string;
  fileName: string;
  serviceType: string;
  uploadDate: string;
  fileUrl: string;
  status: 'pending' | 'verified' | 'rejected';
}

interface UserDocumentsProps {
  userId: string;
}

export default function UserDocuments({ userId }: UserDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUserDocuments();
    }
  }, [userId]);

  const fetchUserDocuments = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/documents`);
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data = await response.json();
      setDocuments(data.documents);
    } catch (err) {
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const groupDocumentsByService = () => {
    const grouped = documents.reduce((acc, doc) => {
      if (!acc[doc.serviceType]) {
        acc[doc.serviceType] = [];
      }
      acc[doc.serviceType].push(doc);
      return acc;
    }, {} as Record<string, Document[]>);
    return grouped;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">{error}</div>
    );
  }

  const groupedDocuments = groupDocumentsByService();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Documents</h2>
      {Object.entries(groupedDocuments).map(([serviceType, docs]) => (
        <Card key={serviceType}>
          <CardHeader>
            <CardTitle className="text-lg">{serviceType}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {docs.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusBadgeColor(doc.status)}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(doc.fileUrl, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(doc.fileUrl, '_blank')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}