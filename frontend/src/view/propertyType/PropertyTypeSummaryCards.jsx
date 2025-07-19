import React from 'react';
import StatCard from '@/components/ui/stat-card';
import { useGetPropertyTypeStatsQuery } from '@/redux/api/propertyTypeApi';
import { FolderOpen, Play, CheckCircle, Archive, Users, Calendar } from 'lucide-react';

const PropertyTypeSummaryCards = () => {
  const { data: stats, isLoading, error } = useGetPropertyTypeStatsQuery();

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-full text-center text-red-500 p-4">
          Error loading property type statistics
        </div>
      </div>
    );
  }

  const propertyTypeStats = stats?.data || {};

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Property Types"
        value={propertyTypeStats.totalPropertyTypes || 0}
        icon={FolderOpen}
        color="blue"
        description="All property types in the system"
        isLoading={isLoading}
      />
      
      <StatCard
        title="With Description"
        value={propertyTypeStats.withDescriptionCount || 0}
        icon={CheckCircle}
        color="green"
        description={`${propertyTypeStats.withDescriptionPercentage || 0}% have descriptions`}
        isLoading={isLoading}
      />
      
      <StatCard
        title="Without Description"
        value={propertyTypeStats.withoutDescriptionCount || 0}
        icon={Archive}
        color="yellow"
        description={`${propertyTypeStats.withoutDescriptionPercentage || 0}% missing descriptions`}
        isLoading={isLoading}
      />
      
      <StatCard
        title="Recently Added"
        value={propertyTypeStats.recentCount || 0}
        icon={Calendar}
        color="purple"
        description="Added in the last 30 days"
        isLoading={isLoading}
      />
    </div>
  );
};

export default PropertyTypeSummaryCards;