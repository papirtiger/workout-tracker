export const exportWorkoutToExcel = (workout) => {
    // Tilføj BOM for at sikre at Excel læser UTF-8 korrekt
    const BOM = '\uFEFF';
    let csvContent = BOM;
    
    // Format data for Excel med korrekt dansk encoding
    csvContent += `Træningsprogram: ${workout.programName}\n`;
    csvContent += `Dato: ${new Date(workout.date).toLocaleDateString('da-DK')}\n\n`;
    
    // Data for hver øvelse
    workout.exercises.forEach(exercise => {
      csvContent += `${exercise.name}\n`;
      csvContent += `Mål: ${exercise.sets} sæt × ${exercise.reps} reps`;
      if (exercise.weight) csvContent += ` @ ${exercise.weight}kg`;
      csvContent += '\n';
      
      // Resultater for hvert sæt
      csvContent += "Sæt,Reps udført\n";
      exercise.setResults.forEach((reps, index) => {
        csvContent += `${index + 1},${reps}\n`;
      });
      csvContent += '\n';
    });
  
    // Download filen
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const fileName = `træning_${workout.programName}_${new Date(workout.date).toLocaleDateString('da-DK').replace(/\./g, '-')}.csv`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };